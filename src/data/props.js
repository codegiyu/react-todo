import image1 from "../assets/images/card-image-1.png";
import image2 from "../assets/images/card-image-2.png";
import image3 from "../assets/images/card-image-3.png";

export const TASKS_DATA = {
    todo: [
        {
            taskid: 1,
            title: "Highfidelity Design",
            desc: "Make clear design and color",
            progress: 0,
            messages: 7,
            links: 2,
            status: "todo"
        },
        {
            taskid: 2,
            title: "Usability Design",
            desc: "Make clear design and color",
            progress: 0,
            messages: 7,
            links: 2,
            status: "todo"
        }
    ],
    ongoing: [
        {
            taskid: 3,
            title: "Highfidelity Design",
            desc: "Make clear design and color",
            progress: 3,
            messages: 7,
            links: 2,
            status: "ongoing"
        }
    ],
    completed: [
        {
            taskid: 4,
            title: "Usability Design",
            desc: "Make clear design and color",
            progress: 9,
            messages: 7,
            links: 2,
            status: "completed"
        },
        {
            taskid: 5,
            title: "Highfidelity Design",
            desc: "Make clear design and color",
            progress: 10,
            messages: 7,
            links: 2,
            status: "completed"
        }
    ]
}

export const imageRadioOptions = [
    { value: image1, label: "Image 1" },
    { value: image2, label: "Image 2" },
    { value: image3, label: "Image 3" }
]