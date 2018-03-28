---
# LAYOUT DATA
layout: case_study
body-class: case-study tolerance
active: true
homepage: true
published: true
order: 3
# END LAYOUT DATA

title: Making it easier for educators to meet the immediate needs of their students.

cs-class: "teaching-tolerance"

cs-preview:
  image: /assets/images/work/tolerance/TT-homepage.jpg
  type: Responsive Drupal Site
  client: "Teaching Tolerance"
  description: "Dedicated to educating young people to become active participants in a diverse democracy."

cs-header:
  header-image: /assets/images/work/tolerance/TT-homepage.jpg
  client: "Teaching Tolerance"
  title: "Dedicated to educating young people to become active participants in a diverse democracy."

cs-intro:
  type: "Teaching Tolerance"
  mission: "Teaching Tolerance -- a program of the Southern Poverty Law Center -- is committed to providing educators with a multitude of resources and activities that will help foster a kind and inclusive school climate."
  text: |

cs-sections:
  - section-title: "Strategy and Design"
    section-description: |
      Educators often have to respond to issues of intolerance at a speed and scale that can be incredibly challenging. News travels quickly, students form opinions and harbor fears, and teachers can feel isolated when trying to make sense of these issues for themselves and their students.

      While Teaching Tolerance already provided the ability to create learning plans around certain themes, they needed their tools to evolve. The world was moving at a pace that their present systems could not address. They needed something that would enable rapid generation and dissemination of new materials, while also surfacing valuable content from the past that has renewed importance.

      In redesigning their website, ThinkShout set out to turn the wealth of articles and resources Tolerance had into teachable materials, and did so by creating a guided Learning Plan Builder that makes all content classroom-ready.  Tolerance grants free access to thousands of resources -- from video to essays to proven teaching strategies -- and everything within that catalogue is now actionable.

  - section-image: "/assets/images/work/tolerance/TS-Case-Studies-Tolerance-Bullying-Bias-1.png"
    section-image-alt: "Image: Tolerance.org Desktop and Mobile"

  - section-title:
    section-description: |
      Our approach to design was to provide an experience without barriers. Regardless of whether a user is on their phone while taking the train to work or on their desktop at home, they should be able to easily access all resources as well as use them to build learning plans using the step-by-step process we built. We wanted a streamlined experience, with everything from magazine articles, lessons, texts, and professional development materials to be easily digestible, searchable, and most importantly, offer the ability for users to build a plan off of them on the fly.

  - section-image: "/assets/images/work/tolerance/TS-Case-Studies-Tolerance-Actionable-Content-1.png"
    section-image-alt: "Image: Examples of actionable content such as featured articles with a 'Teach This' button that adds content directly to your learning plan."

  - section-title:
    section-description: |
      We took the current Tolerance brand and refreshed it to accommodate a modern, content-rich site. While sticking with their current brand's foundation, we explored colors and typography treatments that would allow for a design that supports (rather than overshadows) the robust content offered. Tolerance also has a beautiful, vast library of photography, and are continually creating timely and engaging illustration. Those elements drive the core visuals of the site.

  - section-image: "/assets/images/work/tolerance/tolerance-illustrations-john-jay-cabuay.jpg"
    section-image-alt: "Image: illustration of 2 students"
    section-image-caption: "Illustration by John Jay Cabuay"

  - section-title:
    section-description: |
      With a new design and a multitude of options for displaying content types, we created a detailed a style guide that specified the desired interactions that would take place on the pages of Tolerance.org. This truly set the team up for success in the next phase, implementation.

  - section-title: "The Learning Plan Builder"
    section-description: |
      Learning Plans are a key part of the Tolerance.org ecosystem. They are the bridge between a stagnant piece of content on the site and the classroom. They allow teachers to start with a foundational Text or Article written by Teaching Tolerance, and tailor the presentation of the ideas within the article to their students' grade level, topics, and social justice domains.

  - section-image: "/assets/images/work/tolerance/TS-Case-Studies-Tolerance-Learning-Plan-Builder-Mobile-Desktop.png"
    section-image-alt: "Image: Learning Plan Builder landing page"

  - section-title:
    section-description: |
      We built the Learning Plan Builder as one long form with a progress bar to allow a teacher to quickly move through the creation process. Content is dynamically added via AJAX requests when selections are made, and teachers can add these texts, strategies, and tasks to their Learning Plan.

      We also built the necessary privacy settings to allow teachers to work on a Learning Plan as a draft until they're ready to publish and share it with the world (where it will appear in the Learning Plan index on the site). Teachers can also share a plan with their colleagues or copy an existing plan as a starting point.

  - section-image: "/assets/images/work/tolerance/TS-Case-Studies-Tolerance-Learning-Plan-Mobile-Screens.png"
    section-image-alt: "Image: mobile screens of the learning plan builder"

  - section-title: "Migration and Integrations"
    section-description: |
      Teaching Tolerance was started in 1991 and first began producing content for teachers through their award winning Teaching Tolerance Magazine and films about the modern civil rights movement. Tolerance's online presence was quick to follow and produced a vast amount of content they needed migrated to the new site. ThinkShout took on the challenge of migrating this huge amount of content from two older Drupal 6 and 7 sites into one new Drupal 8 site, while mapping to a new site architecture at the same time.

      ThinkShout has maintained the Drupal Salesforce module for a number of years, but this was our first Drupal 8 Salesforce integration, and probably one of the first anywhere. Although the Drupal 8 Salesforce [module](https://www.drupal.org/project/salesforce) is still in active development, we contributed a lot of code to make it production-ready for Tolerance. We use RedHen Contacts & Orgs on Tolerance.org to map to Salesforce objects and sync data bi-directionally. Tolerance can now use Salesforce to manage their large user base and the schools and organizations they are connected to.

      Most organizations at one time or another face data integrity issues. It was certainly true of Teaching Tolerance, particularly when it came to the schools teachers are connected to. Two individuals might use slightly different names or spellings for the same institution ("Thomas Jefferson HS" vs "Thomas Jefferson High School" for example). This makes it especially challenging to match up in a database and would generate multiple duplicates.

      In order to uniquely identify one's school, we built a Google Maps based search/selection tool for users to input their school and attach to their profile.

  - section-image: "/assets/images/work/tolerance/LearningPlan_locator.jpg"
    section-image-alt: "Image: School selector"

  - section-title:
    section-description: |
      Using the Google Places API, we were able to identify these schools, allowing for clean differentiation and preventing duplication in the backend, all while providing an intuitive, quick, and unobtrusive user interface. We built this tool with code adapted from Google Places documentation, Redhen Orgs, Entity Reference fields, and custom code.

  - section-title: "Engaging Audiences"
    section-description: |
      Let's go back to the start. This project began as many of ours do at ThinkShout: by addressing the needs of the user and providing them with something valuable to make their life easier. That is certainly true in the case of Teaching Tolerance. We set out to make it easier for educators to locate resources that would cultivate empathy in their classrooms and grant students the ability to view the world from multiple perspectives.

      But a website is only as successful as the engagement it sparks from its users. We knew based on our discovery work and research with the Tolerance team that educators struggle to keep up with the pace of the world in which we live, all the while ensuring that they meet the standards of their local school districts.

      That's what lead to the creation of "The Moment," a curated response to anything happening in the news.

  - section-image: "/assets/images/work/tolerance/The-moment.png"
    section-image-alt: "Image: The Moment"
    section-image-full: true

  - section-title:
    section-description: |
      The Moment is a branded publishing platform that surfaces the most important content in response to cultural events. Whether the content is from five years ago or five hours, users get the best that Teaching Tolerance has to offer. And, by linking this content up to the organization's email communication strategy, we ensure that teachers get the materials in their inbox before they know they need it. Now when educators subscribe to this list, they can create first-class lessons in a timely manner, send them via email and social, and create a real sense of community in the classrooms across the country.


  - section-title: "The Result"
    section-description: |
      While Teaching Tolerance can keep its finger on the pulse of current events and cultural moments, it's impossible to predict what every individual educator will need in their local communities. Providing these materials free of charge in an extensive library opens up endless possibilities for all educators.

      Now users can craft unique learning plans and share them with peers in their own schools or across the country. Over time, as the online community grows, we hope to build more social tools for teachers to share, comment on, and learn from each other's work, work that ultimately fosters a more inclusive and kind environment in our schools.

cs-cta-text: Launch Site
cs-cta-url: https://www.tolerance.org/

---
