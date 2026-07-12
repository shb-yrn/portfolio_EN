const isDesktop = () => window.matchMedia("(min-width: 769px)").matches;

document.addEventListener("DOMContentLoaded", () => {

  const updateYear = document.getElementById('footer_update_year');

  let currentYear = new Date().getFullYear();
  updateYear.textContent = currentYear;



  gsap.registerPlugin(ScrollTrigger);

  // =========================
  // Helper
  // =========================

  const reveal = (selector, vars) => {
    gsap.utils.toArray(selector).forEach((el) => {
      gsap.from(el, {
        ease: "power3.out",
        ...vars,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });
  };

  const revealChildren = (selector, vars) => {
    gsap.utils.toArray(selector).forEach((el) => {
      gsap.from(el.children, {
        ease: "power3.out",
        ...vars,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });
  };

  
  // =========================
  // Counter
  // =========================

  gsap.utils.toArray(".stat-number").forEach((el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const counter = { val: 0 };

    gsap.to(counter, {
      val: target,
      duration: 1.6,
      ease: "power2.out",
      snap: { val: 1 },

      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },

      onUpdate: () => {
        el.textContent = counter.val;
      },
    });
  });

  // =========================
  // Hero
  // =========================

  if (isDesktop()) {
    gsap.timeline({
      defaults: {
        ease: "power2.out",
      },
    })

      .from(".header", {
        y: -100,
        opacity: 0,
        duration: 0.6,
      })

      .from(
        ".nav_logo, .nav_links li, .nav_link_btn",
        {
          y: -20,
          opacity: 0,
          duration: 0.35,
          stagger: 0.08,
          ease: "back.out(1.5)",
        },
        "-=0.3"
      )

      .from(
        ".intro_hero_about_me",
        {
          y: 30,
          opacity: 0,
          duration: 0.45,
        },
        "-=0.1"
      )

      .from(
        ".p_hero_about_me, .bio_hero_about_me, .hero_actions, .hero_quickfacts",
        {
          y: 20,
          opacity: 0,
          duration: 0.35,
          stagger: 0.1,
        },
        "-=0.15"
      )

      .from(
        ".hero_picture",
        {
          x: 80,
          opacity: 0,
          duration: 0.6,
        },
        "<"
      );
  }

  // =========================
  // Reveal
  // =========================

  reveal('[data-reveal="text"]', {
    y: 24,
    opacity: 0,
    duration: 0.7,
  });

  reveal('[data-reveal="img"]', {
    x: -40,
    opacity: 0,
    duration: 0.8,
  });

  reveal('[data-reveal="form"]', {
    x: 30,
    opacity: 0,
    duration: 0.6,
  });

  reveal('[data-reveal="article"]', {
    y: 28,
    opacity: 0,
    duration: 0.7,
  });

  reveal('[data-reveal="card"]', {
    y: 24,
    opacity: 0,
    duration: 0.7,
  });

  // =========================
  // Children Reveal
  // =========================

  revealChildren('[data-reveal="badges"]', {
    y: 12,
    opacity: 0,
    duration: 0.5,
    stagger: 0.06,
    ease: "power2.out",
  });

  revealChildren('[data-reveal="midiaIcons"]', {
    y: -20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: "back.out(1.5)",
  });

  revealChildren('[data-reveal="list"]', {
    x: -20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: "power2.out",
  });

  revealChildren('[data-reveal="certificate"]', {
    y: 24,
    opacity: 0,
    duration: 0.6,
    stagger: 0.12,
  });

  // =========================
  // Skills
  // =========================

  gsap.utils.toArray('[data-reveal="bars"]').forEach((group) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: group,
          start: "top 85%",
          once: true,
        },
      })

      .from(group, {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })

      .from(
        group.querySelectorAll(".skills_section_left_skills div"),
        {
          y: 10,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.3"
      );
  });
});




const loading = document.getElementById("loading");

const header = document.getElementById('header');
const menu_icon = document.getElementById("menu_icon");
const close_icon = document.getElementById("close_icon");
const mobile_nav = document.querySelector(".mobile_nav_container");
const mobileNavLinks = document.querySelectorAll('#mobile_nav li a , #aside_nav_link_btn');


const bgDisabled = document.getElementById("bg_disabled");

window.addEventListener("load" , ()=> {
  document.body.style.overflow = "auto";
  
  loading.style.transform = "translateY(-100vh)";
  setTimeout(() => {
    loading.style.display = "none";
  }, 550);
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

function openMobileNav(){
  mobile_nav.classList.add('active_nav');
  header.classList.add("scrolled");
}
function closeMobileNav(){
  mobile_nav.classList.remove('active_nav');
  header.classList.toggle('scrolled', window.scrollY > 20);
}

function openBgDisabled(){
  bgDisabled.style.display = "block";
  bgDisabled.style.opacity = "1";
  document.body.style.overflow = "hidden";
}
function closeBgDisabled(){
  bgDisabled.style.display = "none";
  bgDisabled.style.opacity = "0";
  document.body.style.overflow = "auto";
}

bgDisabled.addEventListener('click' , ()=> {
  closeBgDisabled();
  closeMobileNav();
  toggleMenuIcons();
});


function toggleMenuIcons() {
  if (getComputedStyle(menu_icon).display == "block") {
    menu_icon.classList.toggle("invisible_icon");
    close_icon.classList.toggle("visible_icon");
    openMobileNav();
    openBgDisabled();
  }else{
    menu_icon.classList.toggle("invisible_icon");
    close_icon.classList.toggle("visible_icon");
    closeMobileNav();
    closeBgDisabled();
  }
}
menu_icon.addEventListener('click', toggleMenuIcons);
close_icon.addEventListener('click', toggleMenuIcons);

mobileNavLinks.forEach((link) => {
  link.addEventListener('click', () => {
    toggleMenuIcons();
  })
});


const overlay = document.getElementById('modalOverlay');
const modalPlatform = document.getElementById('modalPlatform');
const modalTitle = document.getElementById('modalTitle');
const modalYear = document.getElementById('modalYear');
const modalDesc = document.getElementById('modalDesc');
const modalLink = document.getElementById('modalLink');
const credLinks = document.querySelectorAll(".cred_link");
const modalClose = document.getElementById('modalClose');
const modalText = document.getElementById('modalText');
const modalImg = document.getElementById('modalImg');

const cer_infos = [
  {
    title: "React.js: Building an Interface",
    platform: "LinkedIn",
    year: "Dec 2022",
    desc: "آموزش ساخت رابط کاربری با React.js، شامل کامپوننت‌ بندی، مدیریت state و الگوهای رایج توسعه فرانت‌اند.",
    url: "https://www.linkedin.com/learning/certificates/81f6d44bdc2a1fa511f4215411fa46ed516bf2fbdd5abf78f3c8cf4f0c3fdac5",
    imgUrl: "images/certificate/React_js_Building_an_Interface.jpeg"
  },
  {
    title: "React.js Essential Training",
    platform: "LinkedIn",
    year: "Des 2022",
    desc: "آشنایی با مفاهیم پایه React.js و اصول طراحی کامپوننت‌ محور برای توسعه اپلیکیشن‌های وب.",
    url: "https://www.linkedin.com/learning/certificates/b00ad03571b05eac2cb85d033dbc5f348d44f53f462db1af710bf6b91c519ead",
    imgUrl: "images/certificate/React_js_Essential_Training.png"
  },
  {
    title: "C# and .NET Essential Training",
    platform: "LinkedIn",
    year: "Feb 2023",
    desc: "دوره پایه و اساسی برای یادگیری زبان برنامه‌نویسی #C و فریم‌ورک .NET",
    url: "https://www.linkedin.com/learning/certificates/36bddc84cd2c7b151734beb3e79d5d2f472aa40392d5a705044c5840bc627034/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B6twQ0XkWTveeFSnTtWXqTg%3D%3D",
    imgUrl: "images/certificate/C_and_NET_Essential_Training.jpeg"
  },
  {
    title: "React: Accessibility",
    platform: "LinkedIn",
    year: "Dec 2022",
    desc: "آموزش تکنیک‌های دسترس‌پذیری (Accessibility) در توسعه اپلیکیشن‌های React برای ساخت رابط‌های کاربری قابل استفاده برای همه",
    url: "https://www.linkedin.com/learning/certificates/68d87dfbc01db37f4d4a2c9b9abc56eb46981c0f4fbb2a857c52e6172543f45e?trk=share_certificate",
    imgUrl: "images/certificate/React_Accessibility.jpeg"
  },
  {
    title: "Building React and Django Apps",
    platform: "LinkedIn",
    year: "Jan 2023",
    desc: "دوره‌ای برای یادگیری ساخت اپلیکیشن‌های full-stack با استفاده از React در سمت فرانت‌اند و Django در سمت بک‌اند",
    url: "https://www.linkedin.com/learning/certificates/adc8dfc31e4f213c065b8d097060019e38ba75767884edb956a09d7a91ab5d46/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B6twQ0XkWTveeFSnTtWXqTg%3D%3D",
    imgUrl: "images/certificate/Building_React_and_Django_Apps.jpeg"
  },
  {
    title: "React Hooks",
    platform: "LinkedIn",
    year: "Jan 2023",
    desc: "دوره‌ای تخصصی درباره React Hooks، شامل نحوه استفاده از هوک‌های استاندارد و ساخت هوک‌های سفارشی برای مدیریت state و lifecycle در کامپوننت‌های تابعی React",
    url: "https://www.linkedin.com/learning/certificates/4ad08d2e5d3327872012858886a0088e0855305749ea672b5260af92c6518887/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B6twQ0XkWTveeFSnTtWXqTg%3D%3D",
    imgUrl: "images/certificate/React Hooks.jpeg"
  },
  {
    title: "SCRUM",
    platform: "Aryana Business School",
    year: "زمستان 1400",
    desc: "دوره آموزشی درباره متدولوژی Scrum و اصول مدیریت پروژه‌های چابک (Agile)",
    url: "#",
    imgUrl: "images/certificate/scrum.jpg"
  },
  {
    title: "پایان‌نامه رضایت شغلی",
    platform: "مجتمع فنی اطلاعات گستر",
    year: "تابستان 1395",
    desc: "گواهی پایان همکاری و رضایت شغلی صادر شده برای آقای میثاق یاریان که از تاریخ ۹۴/۰۴/۰۱ تا ۹۵/۰۴/۳۱ به عنوان مدیر داخلی و مدرس برنامه‌نویسی با این آموزشگاه همکاری داشته و در طول این مدت از نحوه کار و اخلاق ایشان رضایت کامل اعلام شده است",
    url: "#",
    imgUrl: "images/certificate/Gostar.JPG",
    isContain: true
  },
  {
    title: "ساخت پروژه کامل با Angular 6 و Asp.Net Core",
    platform: "Toplearn",
    year: "دی 1400",
    desc: "دوره آموزشی ساخت پروژه کامل با استفاده از Angular 6 در سمت فرانت‌اند و Asp.Net Core در سمت بک‌اند که با موفقیت به پایان رسیده است",
    url: "https://toplearn.com/Certificate/8673__612aa241-bcc5-9f9b-dc00-39ed32a4bc26",
    imgUrl: "images/certificate/Asp.Net_Core_Angular6.jpeg",
  },
  {
    title: "پروژه محور Asp.Net Core",
    platform: "Toplearn",
    year: "دی 1401",
    desc: "دوره آموزشی پروژه‌محور Asp.Net Core که به صورت عملی و از طریق ساخت یک پروژه واقعی برگزار شده و با موفقیت به پایان رسیده است",
    url: "https://toplearn.com/Certificate/16196__612aa241-bcc5-9f9b-dc00-39ed32a4bc26",
    imgUrl: "images/certificate/Asp.Net_Core.jpeg",
  }
];

function openModal(index) {
  const cer = cer_infos[index];
  modalPlatform.textContent = cer.platform;
  modalTitle.textContent = cer.title;
  modalYear.textContent = cer.year;
  modalDesc.textContent = cer.desc;
  modalLink.href = cer.url;
  if (cer.imgUrl) {
    modalText.innerHTML = "";
    var cerImg = document.createElement("img");
    cerImg.src = cer.imgUrl;
    if (cer.isContain) {
      cerImg.style.objectFit = "contain";
    }
    modalText.appendChild(cerImg);
  }else{
    modalText.innerHTML = "عکس مدرک وجود ندارد";
  }
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

credLinks.forEach((link) => {
  link.addEventListener('click' , (e)=> {
    openModal(Number(e.target.dataset.index));
  });
});

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});


const navLinks = document.querySelectorAll('.nav_links li a');
const sections = document.querySelectorAll('main > section');

function moveActiveNav(targetId) {
  navLinks.forEach((link) => {
    link.classList.toggle('nav_link_active', link.dataset.target === targetId);
  });
}


const observerNav = new IntersectionObserver((entries) => {
  entries.forEach((enter) => {
    if (enter.isIntersecting) {
      moveActiveNav(enter.target.id);
    }
  });
}, {
  root: null,
  rootMargin: '-50% 0px -50% 0px',
  threshold: 0
});

sections.forEach((section) => observerNav.observe(section));



// Projects section
const projectsData = [
  {
    title: "پایش وضعیت توربین‌های زیمنس",
    tag: "صنعتی",
    challenge: "تیم بهره‌برداری ایستگاه تقویت فشار گاز برای پایش وضعیت توربین‌های زیمنس به بازدید حضوری و ثبت دستی پارامترها متکی بود؛ همین موضوع کنترل لحظه‌ای وضعیت تجهیزات را دشوار می‌کرد.",
    solution: "یک نرم‌افزار دسکتاپ تحت ویندوز با C# و DevExpress طراحی و پیاده‌سازی شد که پارامترهای عملکردی توربین‌ها را از دیتابیس SQL Server می‌خواند و در قالب داشبوردهای گرافیکی قابل‌فهم برای اپراتور نمایش می‌دهد.",
    result: "این نرم‌افزار در ایستگاه تقویت فشار گاز دهق اصفهان نصب و در حال استفاده است و پایش وضعیت توربین‌ها را برای اپراتورها ساده‌تر کرده است.",
    tags: ["C#", "DevExpress", "SQL Server", "Windows Application"]
  },
  {
    title: "سامانه پایش ناوگان نیروگاهی",
    tag: "صنعتی",
    challenge: "مدیران ارشد نیاز داشتند وضعیت چند نیروگاه را به‌طور هم‌زمان و از یک نقطه واحد رصد کنند، بدون اینکه مجبور باشند بین چند سامانه جداگانه جابه‌جا شوند.",
    solution: "یک داشبورد تحت وب با بک‌اند .NET و SQL Server و فرانت‌اند HTML5، CSS3، JavaScript و Bootstrap ساخته شد که وضعیت هر واحد نیروگاهی را با نمودارهای Highcharts، AmCharts و Chart.js نمایش می‌دهد.",
    result: "این سامانه در نیروگاه شهید رجایی قزوین، نیروگاه کهنوج و نیروگاه کرمان مستقر شده و مدیریت متمرکز چند نیروگاه از یک پنل واحد را ممکن کرده است.",
    tags: [".NET", "SQL Server", "Bootstrap", "Highcharts"]
  },
  {
    title: "پایش ایستگاه‌های تقویت فشار گاز",
    tag: "صنعتی",
    challenge: "ثبت دستی پارامترهای فشار و دما در ایستگاه‌های تقویت فشار گاز، احتمال خطای انسانی و تأخیر در گزارش‌گیری سازمانی را افزایش می‌داد.",
    solution: "سامانه‌ای تحت وب برای ثبت خودکار و گزارش‌گیری دوره‌ای پارامترهای ایستگاه‌ها با .NET و SQL Server در بک‌اند و HTML5، CSS3، JavaScript و Bootstrap در فرانت‌اند توسعه داده شد؛ داده‌ها با نمودارهای Highcharts و AmCharts نمایش داده می‌شوند.",
    result: "این سامانه در ایستگاه‌های تقویت فشار گاز سمنان، صفاشهر و پتاوه مستقر شده و دقت داده‌های ثبت‌شده را افزایش داده است.",
    tags: [".NET", "SQL Server", "Bootstrap", "AmCharts"]
  },
  {
    title: "نرم‌افزار Smart Report",
    tag: "سازمانی",
    challenge: "واحدهای مختلف سازمان داده‌های خود را در منابع پراکنده نگه می‌داشتند و تولید گزارش‌های مدیریتی یکپارچه زمان زیادی می‌برد.",
    solution: "موتور گزارش‌گیری پویا با .NET و SQL Server ساخته شد که داده‌های اکتسابی نیروگاه یا ایستگاه تقویت فشار گاز را در قالب نمودار نمایش می‌دهد و امکان چاپ مستقیم گزارش‌های تولیدشده را نیز فراهم می‌کند.",
    result: "زمان تهیه گزارش‌های مدیریتی به‌طور قابل‌توجهی کوتاه‌تر شد و دقت داده‌های ارائه‌شده به مدیران افزایش یافت.",
    tags: [".NET", "SQL Server", "Chart.js"]
  },
  {
    title: "پروژه ERP",
    tag: "سازمانی",
    challenge: "سازمان به سامانه‌ای یکپارچه برای مدیریت منابع انسانی، انبارداری، تسهیلات و رفاهی و خدمات پرسنلی نیاز داشت که جایگزین فرآیندهای پراکنده و دستی شود.",
    solution: "سامانه ERP با بک‌اند Django REST Framework و فرانت‌اند React.js طراحی و پیاده‌سازی شد؛ شامل ماژول‌های منابع انسانی، انبارداری، تسهیلات و رفاهی و خدمات.",
    result: "فرآیندهای پرسنلی و انبارداری سازمان یکپارچه و ساختاریافته شد و امکان مدیریت متمرکز ماژول‌های مختلف فراهم گردید.",
    tags: ["Django REST Framework", "React.js", "JWT", "RESTful"]
  },
  {
    title: "دوره آموزشی Jira در مکتب‌خونه",
    tag: "آموزشی",
    challenge: "بسیاری از تیم‌های نرم‌افزاری Jira را نصب می‌کنند اما به دلیل عدم آشنایی با تنظیمات صحیح Workflow، از ظرفیت واقعی ابزار استفاده نمی‌کنند.",
    solution: "دوره‌ای کامل برای راه‌اندازی، پیکربندی Workflow، مدیریت پروژه و نصب پلاگین‌های کاربردی Jira طراحی و در پلتفرم مکتب‌خونه منتشر شد.",
    result: "صدها نفر از تیم‌های نرم‌افزاری توانستند Jira را به‌درستی در فرایند کاری خود پیاده‌سازی کنند.",
    tags: ["Jira", "آموزش", "مدیریت پروژه"]
  },
  {
    title: "توسعه‌دهنده رسمی پلاگین جیرا در Atlassian",
    tag: "بین‌المللی",
    challenge: "تیم‌های سازمانی که از Jira استفاده می‌کنند نیاز به قابلیت‌ها و افزونه‌های اختصاصی داشتند که در نسخه پایه Jira وجود نداشت.",
    solution: "به‌عنوان توسعه‌دهنده رسمی پلاگین Jira در شرکت Atlassian (استرالیا)، در طراحی و توسعه افزونه‌های Marketplace این پلتفرم مشارکت دارم.",
    result: "از تیر ۱۴۰۵ در حال فعالیت در این نقش هستم.",
    tags: ["Jira", "Atlassian", "Plugin Development"]
  }
];

const projectModalOverlay = document.getElementById('projectModalOverlay');
const projectModalClose = document.getElementById('projectModalClose');
const projectModalTag = document.getElementById('projectModalTag');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalChallenge = document.getElementById('projectModalChallenge');
const projectModalSolution = document.getElementById('projectModalSolution');
const projectModalResult = document.getElementById('projectModalResult');
const projectModalTags = document.getElementById('projectModalTags');
const projectLinks = document.querySelectorAll('.proj_card_link');

function openProjectModal(index) {
  const proj = projectsData[index];
  if (!proj) return;
  projectModalTag.textContent = proj.tag;
  projectModalTitle.textContent = proj.title;
  projectModalChallenge.textContent = proj.challenge;
  projectModalSolution.textContent = proj.solution;
  projectModalResult.textContent = proj.result;
  projectModalTags.innerHTML = "";
  proj.tags.forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    projectModalTags.appendChild(span);
  });
  projectModalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeProjectModal() {
  projectModalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

projectLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    openProjectModal(Number(e.currentTarget.dataset.index));
  });
});

projectModalClose.addEventListener('click', closeProjectModal);
projectModalOverlay.addEventListener('click', (e) => {
  if (e.target === projectModalOverlay) closeProjectModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});

// Project filter
const projFilterBtns = document.querySelectorAll('.proj_filter_btn');
const projCards = document.querySelectorAll('.proj_card');

projFilterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    projFilterBtns.forEach((b) => b.classList.remove('proj_filter_active'));
    btn.classList.add('proj_filter_active');

    const filter = btn.dataset.filter;
    projCards.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

// copy email and phone number
const copyBtn = document.querySelectorAll('.copy_btn');

copyBtn.forEach(btn => {
  btn.addEventListener('click' , ()=>{
    const text = btn.dataset.copyText;

    const markCopied = () => {
      let currentTitle = btn.title;
      btn.classList.add('copied');
      btn.setAttribute('title', 'کپی شد!');
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.setAttribute('title', currentTitle);
      }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(markCopied).catch(() => {
        fallbackCopy(text, markCopied);
      });
    } else {
      fallbackCopy(text, markCopied);
    }
  });
});

// for old browsers that don't support navigator
function fallbackCopy(text, onSuccess) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    onSuccess();
  } catch (err) {
    console.error('Copy failed', err);
  }
  document.body.removeChild(textarea);
}


document.querySelector('.contact_us_form').addEventListener('submit', async function (e) {
  e.preventDefault();
 
  const submitBtn = e.target.querySelector('button');
  const name = document.getElementById('inputNameForm').value.trim();
  const email = document.getElementById('inputEmailForm').value.trim();
  const topic = document.getElementById('inputTopicForm').value.trim();
  const message = document.getElementById('textareaMessageForm').value.trim();
 
  if (!name || !email || !message) {
    alert('لطفاً فیلدهای ضروری را پر کنید.');
    return;
  }
 
  submitBtn.disabled = true;
  submitBtn.textContent = 'در حال ارسال...';
 
  try {
    const res = await fetch('/api/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, topic, message }),
    });
 
    const data = await res.json();
 
    if (data.ok) {
      alert('پیام شما با موفقیت ارسال شد!');
      e.target.reset();
    } else {
      alert('خطا در ارسال پیام. دوباره تلاش کنید.');
    }
  } catch (err) {
    console.error(err);
    alert('خطا در ارتباط با سرور.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'ارسال پیام';
  }
});