import Axios from 'axios'
import { useState } from 'react'

import './css/Blog.css'
import Navbar from './Blog/Navbar.js'
import Header from './Blog/Header.js'
import About from './Blog/About.js'
import Promo from './Blog/Promo.js'
import Team from './Blog/Team.js'
import Statistics from './Blog/Statistics.js'
import Work from './Blog/Work.js'
import Skills from './Blog/Skills.js'
import Pricing from './Blog/Pricing.js'
import Contact from './Blog/Contact.js'
import Footer from './Blog/Footer.js'

function Blog() {
  return(
    <>
    <Navbar />
    <Header />
    <About />
    <Promo />
    <Team />
    <Statistics />
    <Work />
    <Skills />
    <Pricing />
    <Contact />
    <Footer />
    </>
  );

}

export default Blog;
