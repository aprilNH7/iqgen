import React from 'react'
import './style.css'
import './responsive.css'
import './bootstrap.min.css'
import { Link } from 'react-router-dom'
// import './fontawesome.min.css'

export default function LandingPage() {

  return (
    <>
   <header className="header-area">
      <div className="container">
         <div className="header-wrapper d-flex align-items-center justify-content-between">
            <nav className="header-nav d-flex align-items-center">
               <Link to="/" className="logo"><img src="assets/img/logo.svg" alt="logo"/></Link>
               <ul className="header-nav-menu d-none d-lg-flex align-items-center">
                  {/* <li className="menu-item"><Link to="#about" className="menu-link d-inline-block">About Us</Link></li>
                  <li className="menu-item"><Link to="#service" className="menu-link d-inline-block">Our Services</Link></li>
                  <li className="menu-item"><Link to="#faq" className="menu-link d-inline-block">FAQ</Link></li>
                  <li className="menu-item"><Link to="#footer" className="menu-link d-inline-block">Contact Us</Link></li> */}
               </ul>
            </nav>
            <div className="header-btns d-none d-lg-flex align-items-center">
               <Link to="/sign-up" className="header-btn theme-btn d-inline-block fw-medium text-center">Sign Up</Link>
               <Link to="/sign-in" className="header-btn theme-btn d-inline-block fw-medium text-center">Login</Link>
            </div>
            <button type="button" title="Open Menu" className="menu-bar d-lg-none border-0 rounded-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-menu" aria-controls="offcanvas-menu">
                <i className="fa-regular fa-bars"></i>
                </button>
         </div>
      </div>
   </header>

   <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvas-menu" aria-labelledby="offcanvas-menuLabel" data-bs-scroll="true">
      <div className="offcanvas-header align-items-center justify-content-between">
         <Link to="index.html" className="logo"><img src="assets/img/logo.svg" alt="logo"/></Link>
         <button type="button" className="menu-bar border-0 rounded-1" data-bs-dismiss="offcanvas" aria-label="Close"><i className="fa-regular fa-xmark"></i></button>
      </div>
      <div className="offcanvas-body">
         <ul className="header-nav-menu">
            <li className="menu-item"><Link to="#about" className="menu-link d-block">About Us</Link></li>
            <li className="menu-item"><Link to="#service" className="menu-link d-block">Our Services</Link></li>
            <li className="menu-item"><Link to="#faq" className="menu-link d-block">FAQ</Link></li>
            <li className="menu-item"><Link to="#footer" className="menu-link d-block">Contact Us</Link></li>
         </ul>
         <div className="header-btns d-flex align-items-center mt-4">
            <Link to="/sign-up" className="header-btn theme-btn d-inline-block fw-medium text-center">Sign Up</Link>
            <Link to="/sign-in" className="header-btn theme-btn d-inline-block fw-medium text-center">Login</Link>
         </div>
      </div>
   </div>


   <main>
      <section className="hero-area overflow-hidden">
         <div className="container">
            <div className="hero-wrapper d-flex flex-column flex-lg-row align-items-center align-items-lg-start">
               <div className="hero-thumb position-relative flex-shrink-0">
                  <img src="assets/img/hero-image.png" alt="hero thumb" className="hero-thumb-img position-absolute"/>
                  <img src="assets/img/hero-img-shape.png" alt="hero thumb shape" className="hero-thumb-shape w-100"/>
                  <Link to="#" title="arrow button" className="arrow-btn rounded-circle d-flex align-items-center justify-content-center position-absolute z-1"><i className="fa-regular fa-arrow-trend-up"></i></Link>
               </div>
               <div className="hero-content flex-grow-1 position-relative z-2">
                  <div className="hero-title section-title">
                     <span className="subtitle d-inline-block bg-black rounded-pill text-white fw-medium">Renewable Energy Finance</span>
                     <h1><span>Smart</span> Power. <span>Smarter</span> Future.</h1>
                     <p className="mb-3 pb-1">Deploying Fast, Flexible Renewable Energy Support and Financing. At IQGen, we provide streamlined, reliable, and innovative development and financial solutions for renewable projects in the residential, commercial and industrial sector.</p>
                     <Link to="/dashboard" className="hero-btn theme-btn d-inline-block fw-medium text-center">Get Started</Link>
                  </div>
                  <div className="iq-gen">
                     <h2 className="iq-gen-title text-center"><span>IQ</span>Gen</h2>
                     <div className="iq-gen-cards">
                        <div className="row gy-3">
                           <div className="col-xl-4 col-lg-6 col-md-4 col-6">
                              <div className="iq-gen-card h-100">
                                 <h3 className="text-center fw-normal mb-1">~80%</h3>
                                 <p className="mb-0 fw-light">Faster Approvals and Offers Than Competitors</p>
                              </div>
                           </div>
                           <div className="col-xl-4 col-lg-6 col-md-4 col-6">
                              <div className="iq-gen-card h-100">
                                 <h3 className="text-center fw-normal mb-1">$13B+</h3>
                                 <p className="mb-0 fw-light">Of Capital Access</p>
                              </div>
                           </div>
                           <div className="col-xl-4 col-lg-6 col-md-4 col-6">
                              <div className="iq-gen-card h-100">
                                 <h3 className="text-center fw-normal mb-1">~70%</h3>
                                 <p className="mb-0 fw-light">Increase in Client Retention</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section className="about-area bg-black" id="about">
         <div className="container">
            <div className="about-title section-title text-center">
               <h2 className="mx-auto fw-light">Your <strong>Trusted</strong> Partner in Solar Project <strong>Financing</strong> and <strong>Development</strong></h2>
               <p className="mx-auto mb-0">At IQGen, we understand that every solar project is unique. With years of experience in renewable energy financing, development, and construction support, our team combines deep industry knowledge with innovative financial strategies to accelerate project timelines and maximize returns.</p>
            </div>
            <div className="about-thumb">
               <img src="assets/img/about-thumb.png" alt="about-thumb" className="w-100"/>
            </div>
            <div className="about-desc-wrap d-grid">
               <p className="about-desc mb-0">We pride ourselves on our ability to close deals in some cases <span>in as little as 10 days</span> from Link completed package, enabling you to stay ahead of project deadlines and focus on delivering clean, sustainable energy.</p>
               <p className="about-desc mb-0">Our agnostic, bespoke approach means we tailor every solution to your project’s specific needs—whether you’re scaling Residential Portfolios, implementing Commercial systems, or constructing Industrial solar solutions.</p>
            </div>
         </div>
      </section>

      <section className="service-area" id="service">
         <div className="container">
            <div className="logo text-center"><img src="assets/img/logo.svg" alt="logo"/></div>
            <div className="service-cta d-flex flex-column flex-lg-row">
               <div className="service-cta-thumb position-relative">
                  <img src="assets/img/service-thumb-1.png" alt="service thumb" className="w-100"/>
                  <Link to="#" title="arrow button" className="arrow-btn rounded-circle d-flex align-items-center justify-content-center position-absolute z-1"><i className="fa-regular fa-arrow-trend-up"></i></Link>
               </div>
               <div className="service-cta-content position-relative z-1 flex-grow-1">
                  <h2 className="service-cta-title fw-semibold text-white">Use Our Platform to Submit Your Project Today!</h2>
                  <p className="service-cta-desc text-white mb-4 fw-light">No two projects are the same, and neither are our solutions. Sign Up today to get started!</p>
                  <Link to="/dashboard" className="service-cta-btn rounded-pill d-inline-block float-end">Get Started Today</Link>
                  <img src="assets/img/service-content-shape.png" alt="shape" className="service-cta-content-shape position-absolute top-0 start-0 w-100 h-100"/>
               </div>
            </div>
            <div className="service-main">
               <div className="service-main-title section-title d-flex flex-column flex-lg-row justify-content-between align-items-center align-items-lg-baseline mb-4 mb-lg-2 text-center text-lg-start">
                  <span className="subtitle d-inline-block bg-black rounded-pill text-white fw-medium">Renewable Energy Finance</span>
                  <h2 className="fw-light mb-0"><strong>Flexible</strong> and <strong>Strategic</strong> <span className="position-relative">Solar <img src="assets/img/icon/star.svg" alt="star" className="position-absolute"/></span> Financing & Support Solutions</h2>
               </div>
               <div className="service-wrapper d-flex flex-column flex-lg-row">
                  <div className="service-left flex-shrink-0">
                     <div className="service-item-list">
                        <div className="service-item d-flex align-items-baseline">
                           <span className="service-item-icon"><i className="fa-regular fa-arrow-right-long"></i></span>
                           <div className="service-item-content">
                              <h5 className="fw-semibold">Residential Portfolios</h5>
                              <p className="mb-0">Scalable PPA solutions tailored to large residential solar projects and portfolios.</p>
                           </div>
                        </div>
                        <div className="service-item d-flex align-items-baseline">
                           <span className="service-item-icon"><i className="fa-regular fa-arrow-right-long"></i></span>
                           <div className="service-item-content">
                              <h5 className="fw-semibold">Commercial Projects</h5>
                              <p className="mb-0">Customized PPA structures for commercial-scale solar systems to optimize returns.</p>
                           </div>
                        </div>
                        <div className="service-item d-flex align-items-baseline">
                           <span className="service-item-icon"><i className="fa-regular fa-arrow-right-long"></i></span>
                           <div className="service-item-content">
                              <h5 className="fw-semibold">Industrial Installations</h5>
                              <p className="mb-0">Robust financing options for large-scale industrial solar projects to ensure seamless execution.</p>
                           </div>
                        </div>
                        <div className="service-item d-flex align-items-baseline">
                           <span className="service-item-icon"><i className="fa-regular fa-arrow-right-long"></i></span>
                           <div className="service-item-content">
                              <h5 className="fw-semibold">Project Financing</h5>
                              <p className="mb-0">Innovative funding models tailored to your project’s specific goals.</p>
                           </div>
                        </div>
                        <div className="service-item d-flex align-items-baseline">
                           <span className="service-item-icon"><i className="fa-regular fa-arrow-right-long"></i></span>
                           <div className="service-item-content">
                              <h5 className="fw-semibold">Tax Equity Financing</h5>
                              <p className="mb-0">Optimize your project’s financial structure by leveraging available tax incentives.</p>
                           </div>
                        </div>
                        <div className="service-item d-flex align-items-baseline">
                           <span className="service-item-icon"><i className="fa-regular fa-arrow-right-long"></i></span>
                           <div className="service-item-content">
                              <h5 className="fw-semibold">Bridge Financing</h5>
                              <p className="mb-0">Short-term funding solutions to keep your project moving seamlessly.</p>
                           </div>
                        </div>
                        <div className="service-item d-flex align-items-baseline">
                           <span className="service-item-icon"><i className="fa-regular fa-arrow-right-long"></i></span>
                           <div className="service-item-content">
                              <h5 className="fw-semibold">Development & Construction Support</h5>
                              <p className="mb-0">Hands-on expertise to guide your project through planning, permitting, and execution.</p>
                           </div>
                        </div>
                     </div>
                     <div className="service-thumb">
                        <img src="assets/img/service-thumb-3.png" alt="service-thumb" className="w-100"/>
                     </div>
                  </div>
                  <div className="service-right">
                     <div className="service-thumb pe-xl-4">
                        <img src="assets/img/service-thumb-2.png" alt="service-thumb" className="w-100"/>
                     </div>
                     <div className="service-item-list d-flex flex-column flex-xxl-row gap-4 gap-xxl-0">
                        <div className="service-item d-flex align-items-baseline mb-0 pb-0 border-0 w-100">
                           <span className="service-item-icon"><i className="fa-regular fa-arrow-right-long"></i></span>
                           <div className="service-item-content">
                              <h5 className="fw-semibold">Solar Hybrid Mortgage</h5>
                              <p className="mb-0">Residential Low FICO solution for providing access to clean energy while lowering overall living expenses. </p>
                           </div>
                        </div>
                        <div className="service-item d-flex align-items-baseline mb-0 pb-0 border-0 w-100">
                           <span className="service-item-icon"><i className="fa-regular fa-arrow-right-long"></i></span>
                           <div className="service-item-content">
                              <h5 className="fw-semibold">Debt Financing</h5>
                              <p className="mb-0">Competitive loan structures designed to maximize project ROI.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      
      <section className="blog-area overflow-hidden" id="blog">
         <div className="container">
            <div className="blog-area-title section-title text-center mx-auto mb-4 pb-2">
               <h2 className="fw-light mb-0">Stay Updated on Energy News With <strong>GenPulse™</strong></h2>
            </div>
            <div className="blog-card-wrapper">
               <div className="row gy-4">
                  <div className="col-lg-4 col-md-6">
                     <div className="blog-card bg-black h-100">
                        <Link to="#" className="blog-card-thumb overflow-hidden d-block">
                           <img src="assets/img/blog-img.jpg" alt="blog img" className="w-100 h-100 object-fit-cover"/>
                        </Link>
                        <div className="blog-card-content">
                           <span className="blog-date d-block fw-light">March 6, 2018</span>
                           <h4 className="blog-title fw-normal text-white"><Link to="#" className="text-white">How Technology is Changing the Game</Link></h4>
                           <p className="blog-desc fw-light">As the world continues to transition to renewable energy.</p>
                           <span className="blog-author text-white">Leslie Alexander</span>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                     <div className="blog-card bg-black h-100">
                        <Link to="#" className="blog-card-thumb overflow-hidden d-block">
                           <img src="assets/img/blog-img.jpg" alt="blog img" className="w-100 h-100 object-fit-cover"/>
                        </Link>
                        <div className="blog-card-content">
                           <span className="blog-date d-block fw-light">July 14, 2015</span>
                           <h4 className="blog-title fw-normal text-white"><Link to="#" className="text-white">The Promise of Offshore Wind Farms</Link></h4>
                           <p className="blog-desc fw-light">Wind energy is one of the most reliable forms of renewable energy.</p>
                           <span className="blog-author text-white">Jacob Jones</span>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                     <div className="blog-card bg-black h-100">
                        <Link to="#" className="blog-card-thumb overflow-hidden d-block">
                           <img src="assets/img/blog-img.jpg" alt="blog img" className="w-100 h-100 object-fit-cover"/>
                        </Link>
                        <div className="blog-card-content">
                           <span className="blog-date d-block fw-light">November 16, 2014</span>
                           <h4 className="blog-title fw-normal text-white"><Link to="#" className="text-white">The Key to Unlocking Link 100% Renewable Future</Link></h4>
                           <p className="blog-desc fw-light">One of the main challenges with renewable energy sources like solar and wind.</p>
                           <span className="blog-author text-white">Wade Warren</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>   
      <section className="faq-area px-md-3" id="faq">
         <div className="faq-wrapper d-flex flex-column flex-xl-row bg-black">
            <div className="faq-wrapper-left flex-shrink-0">
               <h2 className="faq-title fw-semibold text-white mb-4 mb-xl-5">FAQs</h2>
               <p className="faq-desc mb-4 mb-xl-5 fw-medium">As Link leading digital marketing agency, we are dedicated to providing comprehensive educational resources and answering frequently asked questions to help our clients.</p>
               <div className="faq-btns d-flex align-items-center justify-content-center justify-content-xl-start gap-4 gap-xl-5">
                  <Link to="#" className="faq-btn fw-bold rounded-pill d-inline-block">More Questions</Link>
                  <Link to="#footer" className="contact-btn fw-semibold d-inline-block text-decoration-underline">Contanct Us</Link>
               </div>
            </div>
            <div className="faq-accordion accordion flex-grow-1 w-100" id="faq-accordion">
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-1" aria-expanded="true" aria-controls="faq-collapse-1">
                        <span className="d-block pe-4">What is IQGen?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-1" className="accordion-collapse collapse show" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">IQGen is Link solar financing provider specializing in crea8ve PPA financing, offering Link 10-day close process for qualifying projects.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-2" aria-expanded="false" aria-controls="faq-collapse-2">
                        <span className="d-block pe-4">How does IQGen differ from other solar financiers? </span>
                     </button>
                  </h4>
                  <div id="faq-collapse-2" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">Capital for immediate deployment. 10-day close process—one of the fastest in the industry. 10.8GW of global experience in energy project financing. Flexible EPC collabora8on, allowing you to work with your own team or ours. Support for non-profit off-takers, such as schools, municipali8es, and government en88es.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-3" aria-expanded="false" aria-controls="faq-collapse-3">
                        <span className="d-block pe-4">Do you work with non-profit organizaons as off-takers?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-3" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">Yes! We welcome non-profit off-takers, including schools, universies, municipalies, and government agencies. Our PPA financing opons allow non-profits to access solar energy with no upfront costs while securing long-term energy savings.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-4" aria-expanded="false" aria-controls="faq-collapse-4">
                        <span className="d-block pe-4">What is Link Power Purchase Agreement (PPA)?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-4" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">A PPA is Link financing model where Link third party owns and operates Link solar system, and the off-taker (business, school, municipality, etc.) purchases the energy at Link fixed rate over Link set period with no upfront costs.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-5" aria-expanded="false" aria-controls="faq-collapse-5">
                        <span className="d-block pe-4">How does IQGen evaluate project financing?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-5" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">Unlike many financiers who solely rely on Debt-Service Coverage Rao (DSCR), IQGen takes Link holisc financial approach by focusing on avoided costs, OPEX reducon, sustainability and resiliency gains to ensure alignment with real-world cash flow improvements.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-6" aria-expanded="false" aria-controls="faq-collapse-6">
                        <span className="d-block pe-4">What types of solar projects qualify for IQGen financing?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-6" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">Commercial and industrial solar projects, located in acve PPA markets, with credit-worthy or non-profit off-takers such as businesses, schools, or municipalies.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-7" aria-expanded="false" aria-controls="faq-collapse-7">
                        <span className="d-block pe-4">What documents are required to qualify for PPA financing?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-7" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">System Size and Price Per Wa\ (PPW), 12 Months of Ulity Bills, System Design (Helioscope or ETB), Arcles of Incorporaon, Property Title and Tax Bill, Bylaws or Operang Agreement, Government ID of signers, 3-Year Financial Statements, Mortgage Statement (if applicable), Proof of High-Speed Internet, Proof of Clear Property Title, EPC License, Insurance, and SOQ (if applicable).</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-8" aria-expanded="false" aria-controls="faq-collapse-8">
                        <span className="d-block pe-4">Why do you need u8lity bills for funding?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-8" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">U8lity bills help assess energy consumpon and potenal savings to determine project viability.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-9" aria-expanded="false" aria-controls="faq-collapse-9">
                        <span className="d-block pe-4">What if I don’t have all the required documents?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-9" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">That’s okay! We’ll provide Link checklist and guide you through the process.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-10" aria-expanded="false" aria-controls="faq-collapse-10">
                        <span className="d-block pe-4">Do you offer flexible PPA terms?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-10" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">Yes! We provide customized PPA structures that align with each project’s unique needs.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-11" aria-expanded="false" aria-controls="faq-collapse-11">
                        <span className="d-block pe-4">Can we refinance an exisng PPA?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-11" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">Yes, refinancing opons are available depending on the project details and off-taker requirements.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-12" aria-expanded="false" aria-controls="faq-collapse-12">
                        <span className="d-block pe-4">How quickly can IQGen provide funding?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-12" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">We can close financing in as li\le as 10 days from Link completed package.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-13" aria-expanded="false" aria-controls="faq-collapse-13">
                        <span className="d-block pe-4">What is the approval process like?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-13" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">We can close financing in as li\le as 10 days from Link completed package.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-14" aria-expanded="false" aria-controls="faq-collapse-14">
                        <span className="d-block pe-4">What is the approval process like?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-14" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">Submit project details and documents. Approval within 48-72 hours. Funding available within 10 days.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-15" aria-expanded="false" aria-controls="faq-collapse-15">
                        <span className="d-block pe-4">Are there any upfront costs?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-15" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">No, there are no upfront costs for qualifying projects.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-16" aria-expanded="false" aria-controls="faq-collapse-16">
                        <span className="d-block pe-4">How does IQGen evaluate project eligibility?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-16" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">System size & PPW, creditworthiness of the off-taker, system design and projected energy output, and project readiness and permihng status.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-17" aria-expanded="false" aria-controls="faq-collapse-17">
                        <span className="d-block pe-4">What happens aier funding is approved?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-17" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">Once funding is secured, your project moves to execuon with your EPC team or one of our recommended partners.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-18" aria-expanded="false" aria-controls="faq-collapse-18">
                        <span className="d-block pe-4">Does IQGen offer financing for energy efficiency projects in addion to solar?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-18" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">Yes, we support financing for energy storage and other energy efficiency upgrades when bundled with Link solar PPA.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-19" aria-expanded="false" aria-controls="faq-collapse-19">
                        <span className="d-block pe-4">What if I don’t have an EPC partner? </span>
                     </button>
                  </h4>
                  <div id="faq-collapse-19" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">We can connect you with trusted, licensed EPCs from our network.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-20" aria-expanded="false" aria-controls="faq-collapse-20">
                        <span className="d-block pe-4">What is an EPC Statement of Qualifica8ons (SOQ)?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-20" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">An SOQ is Link document outlining an EPC’s experience, cer8fica8ons, and past projects to verify their qualificaons.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-21" aria-expanded="false" aria-controls="faq-collapse-21">
                        <span className="d-block pe-4">Do you fund projects that are sll in early development?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-21" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">Yes! We fund projects at various stages, including early development, ready-to-build, and under construc8on.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-22" aria-expanded="false" aria-controls="faq-collapse-22">
                        <span className="d-block pe-4">What types of off-takers qualify?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-22" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">Schools and universi8es, municipali8es and government enes, large businesses and industrial facilies, and non-profit organizaons.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-23" aria-expanded="false" aria-controls="faq-collapse-23">
                        <span className="d-block pe-4">What makes now the right me to secure solar financing?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-23" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">Federal & state incen8ves (Investment Tax Credits, net metering), corporate adopon (70% of Fortune 500 companies have renewable goals), and advancements in technology (higher efficiency, lower costs).</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-24" aria-expanded="false" aria-controls="faq-collapse-24">
                        <span className="d-block pe-4">What if I’m not ready to move forward yet?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-24" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">We can provide guidance, financing projecons, and market insights so you’re fully prepared when the me is right.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-25" aria-expanded="false" aria-controls="faq-collapse-25">
                        <span className="d-block pe-4">Can I schedule Link call to discuss my project before applying?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-25" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">Yes! Our team is happy to answer quesons and guide you through the process.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-26" aria-expanded="false" aria-controls="faq-collapse-26">
                        <span className="d-block pe-4">Do you offer tax equity financing?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-26" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">Yes! We structure tax equity financing soluons for projects that qualify for federal tax incenves.</p>
                     </div>
                  </div>
               </div>
               <div className="accordion-item rounded-0 bg-transparent border-end-0 border-start-0">
                  <h4 className="accordion-header">
                     <button className="accordion-button shadow-none fw-semibold text-white bg-transparent collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapse-27" aria-expanded="false" aria-controls="faq-collapse-27">
                        <span className="d-block pe-4">Does IQGen provide financing for community solar projects?</span>
                     </button>
                  </h4>
                  <div id="faq-collapse-27" className="accordion-collapse collapse" data-bs-parent="#faq-accordion">
                     <div className="accordion-body">
                        <p className="faq-desc mb-0 fw-medium">Yes! We work with developers and municipalies to finance community solar projects that provide energy savings to mulple off-takers.</p>
                     </div>
                  </div>
               </div>
              

            </div>
         </div>
      </section>
   </main>

   <footer className="footer-area bg-black" id="footer">
      <div className="container">
         <div className="footer-wrapper d-flex justify-content-between align-items-start flex-wrap flex-lg-nowrap gap-4">
            <div className="footer-left order-2 order-lg-1">
               <h2 className="footer-title text-white fw-normal">Smart Power. Smarter Future.</h2>
               <div className="footer-contact">
                  <div className="">
                     <h4 className="text-white mb-0">EMAIL</h4>
                     <Link to="mailto:Info@IQGen.Energy" className="text-white">Info@IQGen.Energy</Link>
                  </div>
                  <div className="">
                     <h4 className="text-white mb-0">OFFICE LOCATION</h4>
                     <Link className="text-white">8 The Green Suite B Dover, DE 19901</Link>
                  </div>
               </div>
            </div>
            <div className="footer-logo-container order-1 order-lg-2">
               <Link to="index.html" className="footer-logo d-inline-block"><img src="assets/img/logo-white.svg" alt="logo"/></Link>
            </div>
            <div className="footer-right order-3">
               <div className="footer-menu-container d-flex">
                  <div className="footer-menu"  style={{visibility:'hidden'}}>
                     <h4 className="text-white">Explore</h4>
                     <ul className="d-flex flex-column gap-3">
                        <li><Link to="#" className="d-inline-block">GenPulse™</Link></li>
                     </ul>
                  </div>
                  <div className="footer-menu">
                     <h4 className="text-white">Menu</h4>
                     <ul className="d-flex flex-column gap-3">
                        {/* <li><Link to="/" className="d-inline-block">Home</Link></li>
                        <li><Link to="/" className="d-inline-block">About</Link></li> */}
                        <li><Link to="/sign-in" className="d-inline-block">Login</Link></li>
                        <li><Link to="/sign-up" className="d-inline-block">Sign Up</Link></li>
                        {/* <li><Link to="/" className="d-inline-block">Contact</Link></li> */}
                     </ul>
                  </div>
               </div>
               <div>
                  <div className="footer-social d-flex align-items-center" style={{visibility:'hidden'}}>
                     <Link to="/" className="social-icon d-flex align-items-center justify-content-center rounded-pill"><img src="assets/img/social/facebook.png" alt="facebook"/></Link>
                     <Link to="/" className="social-icon d-flex align-items-center justify-content-center rounded-pill"><img src="assets/img/social/linkedin.png" alt="linkedin"/></Link>
                  </div>
                  <p className="copyright-text text-white mb-0">© 2025  By IQGen. All rights reserved.</p>
               </div>
            </div>
         </div>
      </div>
   </footer>
    </>
  )
}
