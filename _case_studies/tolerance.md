---
# LAYOUT DATA
layout: case_study
body-class: case-study tolerance
active: true
homepage: false
published: true
order: 3
# END LAYOUT DATA

title: Making it easier for educators to meet the immediate needs of their students.

cs-class: "teaching-tolerance"

cs-preview:
  image: /assets/images/work/tolerance/TT-homepage.jpg
  type: Responsive Drupal Site
  client: "Teaching Tolerance"
  description: "Dedicated to educating young people to become engaged actors in a diverse democracy."

cs-header:
  header-image: /assets/images/work/tolerance/TT-homepage.jpg
  client: "Teaching Tolerance"
  title: "Dedicated to educating young people to become engaged actors in a diverse democracy."

cs-intro:
  type: "Teaching Tolerance"
  mission: "Teaching Tolerance -- a program of the Southern Poverty Law Center -- is committed to providing educators with a multitude of resources and activities that will help to foster a kind and inclusive school climate."
  text: |

cs-sections:
  - section-title: "The Strategy"
    section-description: |
      Educators often have to respond to issues of intolerance at a speed and scale that can be incredibly challenging. News travels quickly, students form opinions and harbor fears, and teachers can feel isolated when trying to make sense of these issues for themselves and their students.

      While Teaching Tolerance already provided the ability to create learning plans around certain themes; they needed their tools to evolve. The world was moving at a pace that their present systems could not address. They needed something that would enable rapid generation and dissemination of new materials, while also surfacing valuable content from the past that has renewed importance.

      The key to Teaching Tolerance's redesign was providing timely materials that let educators turn cultural issues and current events into educational experiences. Additionally, this content and its related interactions needed to be accessible no matter the device users were on.

  - section-image: "/assets/images/work/tolerance/TS-Case-Studies-Tolerance-Actionable-Content-1.png"
    section-image-alt: "Image: Examples of actionable content such as featured articles with a 'Teach This' button that adds content directly to your learning plan."

  - section-title:
    section-description: |
      ThinkShout set out to turn the wealth of articles and resources Tolerance.org had into teachable materials, and did so by creating a guided Learning Plan Builder that makes all content classroom-ready.  Tolerance.org grants free access to thousands of resources -- from video to essays to proven teaching strategies -- and everything within that catalogue is now actionable.

  - section-image: "/assets/images/work/tolerance/TS-Case-Studies-Tolerance-Bullying-Bias-1.png"
    section-image-alt: "Image: Tolerance.org Desktop and Mobile"

  - section-title:
    section-description: |
      Users can create custom lessons using the step-by-step process in the Learning Plan Builder, or they can start with any compelling piece of content they find and build a plan around that. And, because ThinkShout takes a mobile-first approach to all our projects, the site is well-positioned to meet its users where they are in the moment they are inspired.

  - section-title: "The Design"
    section-description: |
      Our approach to design was based on the foundation that the user in this case is looking for resources related to a specific topic they wish to address in the classroom.

      The overall goal however was to provide an experience without barriers. Regardless of whether a user is on their phone while riding the train to work, or on their desktop at home, they should be able to easily access all resources as well as use them to build learning plans. We wanted a streamlined experience, with everything from magazine articles, lessons, texts, and professional development materials to be easily digestible, searchable, and most importantly, the ability for users to build a plan off of them on the fly.

      We partnered with the internal design team at the Southern Poverty Law Center (Teaching Tolerance is a program of the SPLC) to evolve the current Tolerance.org brand to accommodate a modern, content-rich site. While sticking with their current brand's foundation, we explored brand colors and typography treatments that would allow for a design that supports (rather than overshadows) the robust content offered. They also have a beautiful, vast library of photography, and are consistently creating timely and engaging illustration. Those elements are what drive the core visuals of the site.

  - section-image: "/assets/images/work/tolerance/tolerance-illustrations-john-jay-cabuay.jpg"
    section-image-alt: "Image: illustration of 2 students"
    section-image-caption: "Illustration by John Jay Cabuay"

  - section-title:
    section-description: |
      Once we got the Learning Plan Builder feature designed, we had to construct it - which turned out to be a rather complex endeavor! We essentially thought of it as one long form with a progress bar that (as the name implies) tracks your progress as you create a learning plan; highlighting the portion of the plan you are currently viewing. A user can click different titles within the progress bar to jump around to other sections of the Learning Plan Builder. Additionally, we added javascript to handle the AJAX requests that added texts, strategies, and tasks so they could display five items at a time for the user.

      This project featured an abundance of detailed information for the implementation team. But it was executed thank to a very detailed style guide that [Vicki Brown](https://thinkshout.com/team/vicki/) created, along with extensive documentation of the desired interactions.

  - section-title: "The Learning Plan Builder"
    section-description: |
      Learning Plans are a key part of the Tolerance.org ecosystem. They are the bridge between a stagnant piece of content on the site and the classroom. They allow teachers to start with a foundational Text/Article written by Teaching Tolerance, and tailor the presentation of the ideas within the article to their students' grade level, interests, as well as other customizations.

  - section-image: "/assets/images/work/tolerance/TS-Case-Studies-Tolerance-Learning-Plan-Builder-Mobile-Desktop.png"
    section-image-alt: "Image: Learning Plan Builder landing page"

  - section-title:
    section-description: |
      The Learning Plan Builder we created is essentially a set of tools for teachers to explore (through search features), bookmark (create a robust user profile), and transform Teaching Tolerance content into classroom-ready lesson plans. We also created the necessary privacy settings to allow teachers to work on a Learning Plan and save as a draft until they're ready to publish and share it with the world (where it will appear in the Learning Plan index on the site). Or, they can also share it with their colleagues and specific individuals with a link unique to their plan and only visible to them.

  - section-image: "/assets/images/work/tolerance/TS-Case-Studies-Tolerance-Learning-Plan-Mobile-Screens.png"
    section-image-alt: "Image: mobile screens of the learning plan builder"

  - section-title:
    section-description: |
      We utilized Drupal 8's Display Suite features for custom form diplays, as well as custom entity displays, and built a custom entity selection widget for the selection of related materials based on dynamic filters; which displays the option as previews of the materials themselves.

      This was our first Drupal 8 Salesforce Integration, and probably one of the first anywhere, as the [module](https://www.drupal.org/project/salesforce) is still in active development and we had to contribute a great deal of code to make it production-ready. It's a minimal integration, but does include entity relationship synchronization and is currently syncing over 340,000 records between the systems (mostly Contacts and Orgs/Accounts).

      The Salesforce integration is syncing Redhen objects. We have Redhen Contact & Orgs used on Tolerance.org to track incoming constituent information, tie new users to existing constituent data, connect users to the schools where they work and/or study, and provide a platform for sharing and collecting the constituent data managed in Salesforce.

  - section-title: "Data Integrity"
    section-description: |
      Most organizations at one time or another face data integrity issues. It was certainly true of Teaching Tolerance, particularly when it came to the schools listed in their system. Two individuals might use slightly different names or spellings for the same institution ("Thomas Jefferson HS" vs "Thomas Jefferson High School" for example). This makes it especially challenging to match up in a database and would generate multiple duplicates. Conversely, there are a wealth of schools with exactly the same names located in different parts of the country. Treating them as the same leads to all sorts of other problems!

      In order to uniquely identify one's school, we built a google-maps based search/selection tool for users to input their school and attach to their profile.

  - section-image: "/assets/images/work/tolerance/TS-Case-Studies-Tolerance-School-Selector.png"
    section-image-alt: "Image: School selector"

  - section-title:
    section-description: |
      Using the Google Places API, we were able to identify these schools, allowing for clean differentiation and preventing duplication in the backend. All while providing an intuitive, quick, and unobtrusive user interface. We built this tool with code adapted from Google Places documentation, Redhen Orgs, Entity Reference fields, and custom code.

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
      The Moment is a branded publishing platform that surfaces the most important content in response to cultural events. Whether the content is from five years ago or five hours, users get the best that Teaching Tolerance has to offer. And, by linking this content up to the organization's email communication strategy, we ensure that teachers get the materials in their inbox before they know they need it. Now when educators subscribe to this list, they can create first class lessons in a timely manner, send them via email and social, and create a real sense of community in the classrooms across the country.


  - section-title: "The Result"
    section-description: |
      While Teaching Tolerance can keep its finger on the pulse of current events and cultural moments, it's impossible to predict what every individual educator will need in their local communities. Providing these materials free of charge in an extensive library opens up endless possibilities for all educators.

      Now users can craft unique learning plans and share them with peers in their own schools or across the country. Over time, as the online community grows, we hope to build more social tools for teachers to share, comment on, and learn from each other's work. Work that ultimately fosters a more inclusive and kind environment in our schools.

cs-cta-text: Launch Site
cs-cta-url: https://www.tolerance.org/

---
