import type { Section } from "../../components/SectionNavigator.astro"


let _sections: any[] = [
    {
        title: "Introduction", 
        subTitle: "What will you build in this course", 
        items: [
            {id: "hello-pong", name: "Hello Pong!", contentType: "video"},
            {id: "why-browser", name: "Why build a game in browser?", contentType: "video"},
            {id: "course-layout", name: "Course Layout", contentType: "video"},
        ]
    },
    {
        title: "Concepts Refresher", 
        subTitle: "Learn basics of Maths/Physics & TS",
        items: [
            {id: "why-ts", name: "Why TS and not JS?", contentType: "video"},
            {id: "ts-basics-1", name: "TS basics - 1", contentType: "video"},
            {id: "ts-basics-2", name: "TS basics - 2", contentType: "video"},
            {id: "maths-basics", name: "Maths/Physics Basics", contentType: "video"},
            {id: "exercise", name: "Exercises", contentType: "article"},
        ]
    }
]

// Add unique id to each page
export const SECTIONS: Section[] = _sections.map((section, sectionIndex) => ({
    ...section,
    id: `${sectionIndex + 1}`,
    items: section.items.map((item: any) => ({
        ...item,
        id: `${sectionIndex+1}/${item.id}`
    }))
}))

