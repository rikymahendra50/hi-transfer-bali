export default function () {

    const contact = [
        {
            title: "Address",
            label: "Jl. Komp. Sesetan Agung No.13B,Sesetan, Denpasar Selatan, Bali 80114",
            link: "#",
        }, {
            title: "Phone",
            label: "08123456789",
            link: "#"
        }, {
            title: "Email",
            label: "Xp7kT@example.com",
            link: "#"
        }
    ]


    const socialMedias = [
        {
            icon: "ic:baseline-facebook",
            label: "Facebook",
            link: "#",
            external: true
        },
        {
            icon: "ri:twitter-x-fill",
            label: "X/Twitter",
            link: "#",
            external: true,
        },
        {
            icon: "ri:instagram-fill",
            label: "Instagram",
            link: "#",
            external: true,
        },
        {
            icon: "ri:youtube-fill",
            label: "Youtube",
            link: "#",
            external: true,
        }
    ]

    return {
        socialMedias,
        contact
    }
}