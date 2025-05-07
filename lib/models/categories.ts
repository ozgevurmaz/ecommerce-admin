import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Category title is required"],
            trim: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            trim: true,
        },
        image: {
            type: String,
            default: "",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        metadata: {
            seo: {
                title: String,
                description: String,
                keywords: [String],
            },
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            }
        ],
    },
    { timestamps: true }
);

categorySchema.pre("validate", function(next) {
    if (this.title && (!this.slug || this.isModified("title"))) {
      this.slug = this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
    next();
  });

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;