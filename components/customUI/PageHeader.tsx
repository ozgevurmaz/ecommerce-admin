import React from 'react'

const PageHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => {
    return (
        <div className='px-1'>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{title}</h2>
            {subtitle && <p className="text-muted-foreground mt-1 text-md">{subtitle}</p>}
        </div>
    )
}

export default PageHeader