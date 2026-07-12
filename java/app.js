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
    desc: "A course on building user interfaces with React.js, covering component structuring, state management, and common front-end development patterns.",
    url: "https://www.linkedin.com/learning/certificates/81f6d44bdc2a1fa511f4215411fa46ed516bf2fbdd5abf78f3c8cf4f0c3fdac5",
    imgUrl: "images/certificate/React_js_Building_an_Interface.jpeg"
  },
  {
    title: "React.js Essential Training",
    platform: "LinkedIn",
    year: "Des 2022",
    desc: "An introduction to the core concepts of React.js and component-based design principles for building web applications.",
    url: "https://www.linkedin.com/learning/certificates/b00ad03571b05eac2cb85d033dbc5f348d44f53f462db1af710bf6b91c519ead",
    imgUrl: "images/certificate/React_js_Essential_Training.png"
  },
  {
    title: "C# and .NET Essential Training",
    platform: "LinkedIn",
    year: "Feb 2023",
    desc: "A foundational course for learning the C# programming language and the .NET framework.",
    url: "https://www.linkedin.com/learning/certificates/36bddc84cd2c7b151734beb3e79d5d2f472aa40392d5a705044c5840bc627034/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B6twQ0XkWTveeFSnTtWXqTg%3D%3D",
    imgUrl: "images/certificate/C_and_NET_Essential_Training.jpeg"
  },
  {
    title: "React: Accessibility",
    platform: "LinkedIn",
    year: "Dec 2022",
    desc: "Training in accessibility techniques for React application development, focused on building interfaces usable by everyone.",
    url: "https://www.linkedin.com/learning/certificates/68d87dfbc01db37f4d4a2c9b9abc56eb46981c0f4fbb2a857c52e6172543f45e?trk=share_certificate",
    imgUrl: "images/certificate/React_Accessibility.jpeg"
  },
  {
    title: "Building React and Django Apps",
    platform: "LinkedIn",
    year: "Jan 2023",
    desc: "A course on building full-stack applications using React on the front end and Django on the back end.",
    url: "https://www.linkedin.com/learning/certificates/adc8dfc31e4f213c065b8d097060019e38ba75767884edb956a09d7a91ab5d46/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B6twQ0XkWTveeFSnTtWXqTg%3D%3D",
    imgUrl: "images/certificate/Building_React_and_Django_Apps.jpeg"
  },
  {
    title: "React Hooks",
    platform: "LinkedIn",
    year: "Jan 2023",
    desc: "A specialized course on React Hooks, covering the use of standard hooks and building custom hooks for state and lifecycle management in functional React components.",
    url: "https://www.linkedin.com/learning/certificates/4ad08d2e5d3327872012858886a0088e0855305749ea672b5260af92c6518887/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B6twQ0XkWTveeFSnTtWXqTg%3D%3D",
    imgUrl: "images/certificate/React Hooks.jpeg"
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
    modalText.innerHTML = "No certificate image available";
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
    title: "Siemens Turbine Condition Monitoring",
    tag: "Industrial",
    challenge: "Windows desktop software for monitoring Siemens turbine condition, developed with C# and DevExpress and a SQL Server database; installed at a gas compressor station.",
    solution: "A Windows desktop application was designed and built with C# and DevExpress that reads the turbines' operational parameters from a SQL Server database and displays them as clear graphical dashboards for the operator.",
    result: "This software is installed and in use at the gas compressor station, making turbine condition monitoring easier for operators.",
    tags: ["C#", "DevExpress", "SQL Server", "Windows Application"]
  },
  {
    title: "Power Plant Fleet Monitoring",
    tag: "Industrial",
    challenge: "a single point, without having to switch between multiple separate systems.",
    solution: "A web-based dashboard was built with a .NET and SQL Server backend and an HTML5, CSS3, JavaScript, and Bootstrap frontend, displaying each power plant unit's status with Highcharts, AmCharts, and Chart.js charts.",
    result: "This system has been deployed at power plants and enables centralized management of multiple power plants from a single panel.",
    tags: [".NET", "SQL Server", "Bootstrap", "Highcharts"]
  },
  {
    title: "Gas Compressor Station Monitoring",
    tag: "Industrial",
    challenge: "Manually logging pressure and temperature parameters at gas compressor stations increased the risk of human error and delays in organizational reporting.",
    solution: "A web-based system for automatic logging and periodic reporting of station parameters was developed with a .NET and SQL Server backend and an HTML5, CSS3, JavaScript, and Bootstrap frontend; data is displayed with Highcharts and AmCharts charts.",
    result: "This system has been deployed at gas compressor stations and has increased the accuracy of the logged data.",
    tags: [".NET", "SQL Server", "Bootstrap", "AmCharts"]
  },
  {
    title: "Smart Report Software ",
    tag: "Enterprise",
    challenge: "Different departments in the organization kept their data in scattered sources, and producing unified management reports took a lot of time.",
    solution: "A dynamic reporting engine was built with .NET and SQL Server that displays acquired data from a power plant or gas compressor station as charts and also provides the ability to directly print the generated reports.",
    result: "The time required to prepare management reports was significantly reduced, and the accuracy of the data presented to managers improved.",
    tags: [".NET", "SQL Server", "Chart.js"]
  },
  {
    title: "ERP Project",
    tag: "Enterprise",
    challenge: "The organization needed an integrated system to manage human resources, warehousing, and staff welfare/facilities services, replacing scattered and manual processes.",
    solution: "An ERP system was designed and built with a Django REST Framework backend and a React.js frontend; including human resources, warehousing, and welfare/facilities service modules.",
    result: "The organization's HR and warehousing processes were unified and structured, enabling centralized management of the various modules.",
    tags: ["Django REST Framework", "React.js", "JWT", "RESTful"]
  },
  {
    title: "Official Jira Plugin Developer at Atlassian",
    tag: "International",
    challenge: "Enterprise teams using Jira needed dedicated features and add-ons that weren't available in the base version of Jira.",
    solution: "As an official Jira plugin developer at Atlassian (Australia), I contribute to the design and development of Marketplace add-ons for the platform.",
    result: "I have been active in this role since June 2026.",
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
      btn.setAttribute('title', 'Copied!');
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