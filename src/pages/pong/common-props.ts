import type { BreadcrumbItem } from "../../components/Breadcrumb.astro"
import type { Section } from "../../components/SectionNavigator.astro"
import type { StrictOmit } from "../../utils/types"


export const PONG_TOP_BREADCRUMB: BreadcrumbItem[] = [{slug: '/pong', name: 'Pong'}]


let _sections: StrictOmit<Section, "id">[] = [
    {
        title: "Introduction", 
        subTitle: "What will you build in this course", 
        items: [
            {slug: "hello-pong", name: "Hello Pong!", contentType: "video"},
            {slug: "why-browser", name: "Why build a game in browser?", contentType: "video"},
            {slug: "course-layout", name: "Course Layout", contentType: "video"},
        ]
    },
    {
        title: "Concepts Refresher", 
        subTitle: "Learn basics of Maths/Physics & TS",
        items: [
            {slug: "why-ts", name: "Why TS and not JS?", contentType: "video"},
            {slug: "ts-basics-1", name: "TS basics - 1", contentType: "video"},
            {slug: "ts-basics-2", name: "TS basics - 2", contentType: "video"},
            {slug: "maths-basics", name: "Maths/Physics Basics", contentType: "video"},
            {slug: "exercise", name: "Exercises", contentType: "article"},
        ]
    }
]

// Add unique id to each page
export const SECTIONS: Section[] = _sections.map((section, sectionIndex) => ({
    ...section,
    id: `${sectionIndex}`,
    items: section.items.map((item: any) => ({
        ...item,
        slug: `/pong/${sectionIndex+1}/${item.slug}`
    }))
}))

export const getPageProps = (slug: string) => ({
    slug: slug,
    breadcrumbs: PONG_TOP_BREADCRUMB,
    sections: SECTIONS
})

