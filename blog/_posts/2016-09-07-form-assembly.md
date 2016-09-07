# Form Assembly

Recently, I need to create a form for an existing site. Creating a form isn’t hard, but I had two problems I needed to solve. 1) The form needed to adopt the style of the existing site. 2) I had no backend to process the form.

I could have used Google Forms. Although it’s a solution, Google Forms does not allow a custom confirmation page. This could lead your user to be lost and wonder why they’ve landed on such a nondescript page after submitting your form. With FormAssembly, I could generate the form markup, add validation and add a custom link for my users to be redirected to after submitting my form.

Usually a site needs to collect some kind of data. It could be as simple as a contact form or collecting emails for a newsletter.  Forms are the way to collect user input on the internet. So we need them. You might have a static site or be a user of a CMS without the ability to create forms. A solution like FormAssembly can help solve this problem.

# Building your form
Inside FormAssembly you have access to a drag and drop interface. This way you don’t have to create your mark up by hand, which is good because FormAssembly provides a lot of custom scripts to help you with validation and grouping fields. When you click the options for each field you can select the type of data you want in the field as well as if it’s presence is required. You can also click into each label to change the text or drag fields around to reorder them. 

Although I’m don’t like the generated markup that much, it’s definitely better than writing all the markup by hand. Also the markup is manageable. Once you’ve created your markup you can click back to your list of forms and click “publish”. Under publishing options there is a text box for you to snag all of form markup. Instead of leaving this in FormAssembly, I copied the markup into an html file and committed it to a github repository. Once you’ve finalized your form fields this makes it easier to manage revisions to your form. If you have changes to a field, simply update it in form assembly and copy the field html into your form again.

# Styling your form
Now the magic can begin. I recommend wrapping the FormAssembly markup in an `id` such as `<div id=“formAssembly”></div>` If you are embedding your form in an existing site, you’ll surely have issues with conflicting styles. Nest all of your styles under the `id` attached to your wrapper element to reduce styling difficulty.  

You can include your styles inside your form, but I opted for an external stylesheet.  I added a style tag inside the wrapper element to link to my stylesheet hosted at github:

`<style>@import url(‘path to stylesheet’);</style>`

The benefit of doing it this way is having all your styles in one place. Then if you create multiple forms, you can link them all to one stylesheet.

# Summary
FormAssembly is really easy to use. As always, my only gripe with a tool like this is less control over the final markup. However, this tool seemed to offer more control than other solutions. They also have a form API if you want to get more advanced. 



