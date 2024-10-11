export default function () {
  const contact = [
    {
      title: "Address",
      label:
        "Jl. Amerta Br. Dinas Kaja , Desa/Kelurahan Busungbiu, Kec. Busungbiu, Kab. Buleleng, Provinsi Bali,Kode Pos: 81154",
      link: "https://maps.app.goo.gl/3XkGAE8Erm2wsdLZA",
    },
    {
      title: "Phone",
      label: "0887744015600",
      link: "tel:+6287744015600",
    },
    {
      title: "Email",
      label: "dekpericab@gmail.com",
      link: "mailto:dekpericab@gmail.com",
    },
  ];

  const socialMedias = [
    {
      icon: "ic:baseline-facebook",
      label: "Facebook",
      link: "#",
      external: true,
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
    },
  ];

  return {
    socialMedias,
    contact,
  };
}
