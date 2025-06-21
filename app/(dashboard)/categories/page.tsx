"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    PlusCircle,
    Pencil,
    Trash2,
    Eye,
    EyeOff,
    RefreshCw,
    Image as ImageIcon,
    Save,
    ArrowLeft
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import Loader from "@/components/customUI/Loader";
import ImageUpload from "@/components/customUI/ImageUpload";
import Delete from "@/components/customUI/Delete";
import { fetchData } from "@/lib/actions/fetchers";
import Image from "next/image";
import PageHeader from "@/components/customUI/PageHeader";


// New/Edit category form type
type CategoryForm = Omit<CategoryType, "_id" | "createdAt" | "updatedAt" | "slug" | "productCount">;

const initialFormState: CategoryForm = {
    title: "",
    description: "",
    image: "",
    products: [],
    isActive: true,
};

const Categories = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [formState, setFormState] = useState<CategoryForm>(initialFormState);
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const router = useRouter();

    // Fetch categories
    const getCategories = async () => {
        const data = await fetchData("categories");
        setCategories(data)
        setIsLoading(false);
    };

    // Create a new category
    const createCategory = async () => {
        try {
            setSubmitting(true);
            const res = await fetch("/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
            });

            if (!res.ok) {
                throw new Error("Failed to create category");
            }

            await getCategories();
            setShowForm(false);
            setFormState(initialFormState);
            toast.success(`Category created.`);
        } catch (error) {
            console.error("[categories_POST]", error);
            toast.error("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    // Update a category
    const updateCategory = async () => {
        if (!selectedCategory) return;

        try {
            setSubmitting(true);
            const res = await fetch(`/api/categories/${selectedCategory._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
            });

            if (!res.ok) {
                throw new Error("Failed to update category");
            }

            await getCategories();
            setShowForm(false);
            setFormState(initialFormState);
            setSelectedCategory(null);
            toast.success(`Category updated.`);
        } catch (error) {
            console.error("[categories_PUT]", error);
            toast.error(`Something went wrong`);
        } finally {
            setSubmitting(false);
        }
    };

    // Toggle category active status
    const toggleCategoryStatus = async (category: CategoryType) => {
        try {
            const res = await fetch(`/api/categories/${category._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...category,
                    isActive: !category.isActive,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to update category status");
            }

            // Update the local state without refetching
            setCategories(prevCategories =>
                prevCategories.map(c =>
                    c._id === category._id ? { ...c, isActive: !c.isActive } : c
                )
            );
            toast.success(`Category ${category.isActive ? "disabled" : "enabled"} successfully`);

        } catch (error) {
            console.error("[categories_TOGGLE]", error);
            toast.error("Failed to update category status. Please try again.");
        }
    };

    const handleEdit = (category: CategoryType) => {
        setSelectedCategory(category);
        setFormState({
            title: category.title,
            description: category.description || "",
            image: category.image || "",
            products: [],
            isActive: category.isActive,
        });
        setIsEditMode(true);
        setShowForm(true);
    };

    const handleAdd = () => {
        setFormState(initialFormState);
        setIsEditMode(false);
        setSelectedCategory(null);
        setShowForm(true);
    };

    const handleDelete = (category: CategoryType) => {
        setSelectedCategory(category);
        setShowDeleteDialog(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setFormState(initialFormState);
        setIsEditMode(false);
        setSelectedCategory(null);
    };

    // form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (url: string) => {
        setFormState(prev => ({
            ...prev,
            image: url
        }))
    }

    // switch input changes
    const handleSwitchChange = (checked: boolean) => {
        setFormState(prev => ({
            ...prev,
            isActive: checked,
        }));
    };

    // Filter categories by search term
    const filteredCategories = categories.filter(category =>
        category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    useEffect(() => {
        getCategories();
    }, []);

    if (isLoading) {
        return (
            <Loader />
        );
    }

    if (showForm) {
        return (
            <div className="p-4 sm:p-6 md:p-10 bg-background">
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={handleCancel}
                        className="mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Categories
                    </Button>
                    <h2 className="text-2xl font-bold text-foreground">{isEditMode ? "Edit Category" : "Add New Category"}</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        {isEditMode ? "Update the details for this category" : "Create a new category for your products"}
                    </p>
                </div>

                <Card className="p-6 bg-card border-border">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-foreground">Category Name</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter category name"
                                value={formState.title}
                                onChange={handleInputChange}
                                className="bg-background border-border text-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-foreground">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Brief description of this category"
                                value={formState.description}
                                onChange={handleInputChange}
                                rows={4}
                                className="bg-background border-border text-foreground"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image" className="text-foreground">Image</Label>
                            <ImageUpload
                                value={formState.image ? [formState.image] : []}
                                onChange={(url) => handleImageChange(url)}
                                onRemove={() => handleImageChange("")}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="isActive"
                                checked={formState.isActive}
                                onCheckedChange={handleSwitchChange}
                            />
                            <Label htmlFor="isActive" className="text-foreground">Active</Label>
                        </div>

                        <div className="flex items-center justify-end space-x-4 pt-4">
                            <Button
                                variant="outline"
                                onClick={handleCancel}
                                disabled={submitting}
                                className="border-border text-foreground hover:bg-accent"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={isEditMode ? updateCategory : createCategory}
                                disabled={!formState.title.trim() || submitting}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                            >
                                {submitting ? (
                                    <>
                                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                        {isEditMode ? "Updating..." : "Creating..."}
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        {isEditMode ? "Update Category" : "Create Category"}
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <PageHeader title="Categories" subtitle="Manage Product Categories"/>

                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
                    <Input
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <Button
                        className="text-primary-foreground bg-primary hover:bg-primary/90"
                        onClick={handleAdd}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>Add Category</span>
                    </Button>
                </div>
            </div>

            <Separator className="my-4 bg-border" />

            {filteredCategories.length > 0 ? (
                <Card className="bg-card border-border">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-border">
                                <TableHead className="w-12 text-foreground"></TableHead>
                                <TableHead className="text-foreground">Name</TableHead>
                                <TableHead className="hidden md:table-cell text-foreground">Description</TableHead>
                                <TableHead className="hidden md:table-cell text-foreground">Products</TableHead>
                                <TableHead className="text-foreground">Status</TableHead>
                                <TableHead className="text-right text-foreground">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCategories.map((category) => (
                                <TableRow key={category._id} className="border-border">
                                    <TableCell>
                                        {category.image ? (
                                            <div className="h-10 w-10 rounded-md overflow-hidden border border-border">
                                                <Image
                                                    src={category.image}
                                                    alt={category.title}
                                                    height={100}
                                                    width={100}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                                                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium text-foreground">{category.title}</TableCell>
                                    <TableCell className="hidden md:table-cell text-muted-foreground">
                                        {category.description ?
                                            (category.description.length > 60 ?
                                                `${category.description.substring(0, 60)}...` :
                                                category.description) :
                                            "-"}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Badge variant="outline" className="border-border text-foreground">
                                            {category.products.length || 0} products
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={category.isActive ? "default" : "secondary"}
                                            className={`${category.isActive ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}`}
                                        >
                                            {category.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => handleEdit(category)}
                                                className="border-border text-foreground hover:bg-accent"
                                            >
                                                <Pencil className="mr-2 h-4 w-4" />
                                                Edit
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => toggleCategoryStatus(category)}
                                                className="border-border text-foreground hover:bg-accent"
                                            >
                                                {category.isActive ? (
                                                    <>
                                                        <EyeOff className="mr-2 h-4 w-4" />
                                                        Disable
                                                    </>
                                                ) : (
                                                    <>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        Enable
                                                    </>
                                                )}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(category)}
                                                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            ) : (
                <div className="flex flex-col items-center justify-center p-10 text-center bg-card border border-border rounded-lg">
                    <h3 className="text-lg font-medium mb-2 text-foreground">No categories found</h3>
                    {searchTerm ? (
                        <p className="text-muted-foreground mb-4">
                            No categories match your search term
                        </p>
                    ) : (
                        <p className="text-muted-foreground mb-4">
                            Get started by adding your first category
                        </p>
                    )}
                    {searchTerm && (
                        <Button
                            variant="outline"
                            onClick={() => setSearchTerm("")}
                            className="mb-2 border-border text-foreground hover:bg-accent"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Clear Search
                        </Button>
                    )}
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent className="bg-popover border-border">
                    <DialogHeader>
                        <DialogTitle className="text-foreground">Delete Category</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Are you sure you want to delete the category "{selectedCategory?.title}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteDialog(false)}
                            disabled={submitting}
                            className="border-border text-foreground hover:bg-accent"
                        >
                            Cancel
                        </Button>
                        {selectedCategory?._id && (
                            <Delete item="categories" id={selectedCategory._id} showText={true} />
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Categories;