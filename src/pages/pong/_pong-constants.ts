import type { Section } from "../../components/SectionNavigator.astro"
import type { StrictOmit } from "../../utils/types"


let _sections: StrictOmit<Section, "id">[] = [
    {
        title: "Introduction", 
        subTitle: "What you will build in this course", 
        items: [
            {id: "hello-pong", url: "", active: false, name: "Hello Pong!", contentType: "video"},
            {id: "why-browser", url: "", active: false, name: "Why build a game in browser?", contentType: "video"},
            {id: "course-layout", url: "", active: false, name: "Course Layout", contentType: "video"},
        ]
    },
    {
        title: "Intro to TypeScript", 
        subTitle: "Learn the basics of Typescript",
        items: [
            {id: "why-ts", url: "", active: true, name: "Why TS and not JS?", contentType: "video"},
            {id: "ts-use-case-1", url: "", active: false, name: "Scenario 1 - Type checks", contentType: "video"},
            {id: "ts-use-case-2", url: "", active: false, name: "Scenario 2 - Type definitions", contentType: "video"},
            {id: "ts-basics-1", url: "", active: false, name: "TS basics 1", contentType: "video"},
            {id: "ts-basics-2", url: "", active: false, name: "TS basics 2", contentType: "article"},
            {id: "ts-exercises", url: "", active: false, name: "Exercises", contentType: "article"},
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

