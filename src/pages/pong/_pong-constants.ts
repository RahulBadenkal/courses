import type { Section } from "../../components/SectionNavigator.astro"
import type { StrictOmit } from "../../utils/types"


let _sections: StrictOmit<Section, "id">[] = [
    {
        title: "Introduction", 
        subTitle: "What you will build in this course", 
        items: [
            {id: "hello-pong", url: "", name: "Hello Pong!", contentType: "video"},
            {id: "why-browser", url: "", name: "Why build a game in browser?", contentType: "video"},
            {id: "course-layout", url: "", name: "Course Layout", contentType: "video"},
        ]
    },
    {
        title: "Concepts Refresher", 
        subTitle: "Learn basics of Maths/Physics & TS",
        items: [
            {id: "why-ts", url: "", name: "Why TS and not JS?", contentType: "video"},
            {id: "ts-basics-1", url: "", name: "TS basics 1", contentType: "video"},
            {id: "ts-basics-2", url: "", name: "TS basics 2", contentType: "video"},
            {id: "maths-basics", url: "", name: "Maths/Physics Basics", contentType: "video"},
            {id: "exercise", url: "", name: "Exercises", contentType: "article"},
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

