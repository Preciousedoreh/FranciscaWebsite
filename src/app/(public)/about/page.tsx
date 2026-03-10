import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { CTASection } from '@/components/sections/CTASection';

export const metadata = {
  title: 'About',
  description: 'Learn about Ifeyinwa Francisca Ubah, a professional non-fiction ghostwriter helping entrepreneurs and thought leaders share their stories.',
};

export default function AboutPage() {
  return (
    <>
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <AnimateOnScroll direction="left">
              <div className="bg-gradient-to-br from-navy-100 to-navy-200 rounded-2xl aspect-[3/4] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-48 h-48 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
                    <span className="text-6xl font-heading font-bold text-navy-600">IFU</span>
                  </div>
                  <p className="text-navy-600 font-medium">Professional Photo Coming Soon</p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll direction="right">
              <div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy-600 mb-6">
                  About Francisca
                </h1>

                <div className="space-y-4 text-lg text-charcoal leading-relaxed">
                  <p>
                    Hi, I'm <strong>Ifeyinwa Francisca Ubah</strong>, a professional non-fiction ghostwriter dedicated to helping entrepreneurs, thought leaders, and individuals share their unique stories and expertise with the world.
                  </p>

                  <p>
                    For years, I've had the privilege of working behind the scenes, transforming ideas, experiences, and knowledge into compelling narratives that resonate with readers. Whether it's a business book, personal memoir, blog content, or social media strategy, I specialize in capturing authentic voices and bringing them to life on the page.
                  </p>

                  <p>
                    What drives me is the belief that everyone has a story worth telling—and that those stories, when told well, have the power to inspire, educate, and transform lives. My role is to make the writing process seamless, enjoyable, and result in work you're proud to call your own.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll>
            <SectionHeading
              title="My Journey into Ghostwriting"
              alignment="left"
              showAccent={true}
            />

            <div className="bg-light-gray rounded-2xl p-8 md:p-12 mb-20">
              <div className="space-y-6 text-lg text-charcoal leading-relaxed">
                <p>
                  My path to ghostwriting wasn't linear, but every step prepared me for this calling. I've always been a storyteller at heart—the person friends turned to when they needed help articulating an idea or crafting the perfect message.
                </p>

                <p>
                  After years of writing in various capacities—from corporate communications to creative projects—I discovered ghostwriting, where I could combine my love for storytelling with my passion for helping others succeed. It was the perfect fit.
                </p>

                <p>
                  What I love most about this work is the collaborative process. Every project begins with deep listening—understanding not just what you want to say, but why it matters, who needs to hear it, and how it should be said. Then comes the craft: structuring narratives, finding the right voice, and polishing every sentence until it shines.
                </p>

                <p>
                  Over the years, I've written books that topped bestseller lists, content strategies that generated millions in revenue, and personal memoirs that brought families to tears. But what fulfills me most is seeing clients achieve their goals—whether that's landing a book deal, establishing thought leadership, or simply preserving their legacy for future generations.
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <SectionHeading title="My Expertise & Skills" alignment="left" showAccent={true} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {[
                {
                  title: 'Business Writing',
                  description: 'Leadership books, white papers, case studies, and business communications',
                },
                {
                  title: 'Personal Development',
                  description: 'Self-help books, coaching materials, and transformational content',
                },
                {
                  title: 'Memoirs & Life Stories',
                  description: 'Personal narratives, autobiographies, and legacy projects',
                },
                {
                  title: 'Content Strategy',
                  description: 'Blog posts, articles, and ongoing content marketing',
                },
                {
                  title: 'Social Media',
                  description: 'Platform-specific content that drives engagement',
                },
                {
                  title: 'Research & Interviews',
                  description: 'In-depth research and empathetic interviewing to capture authentic voices',
                },
              ].map((skill, index) => (
                <AnimateOnScroll key={skill.title} delay={index * 0.1}>
                  <div className="bg-white rounded-lg p-6 shadow-md border border-medium-gray hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-heading font-semibold text-navy-600 mb-3">
                      {skill.title}
                    </h3>
                    <p className="text-charcoal">{skill.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="bg-navy-600 text-white rounded-2xl p-8 md:p-12">
              <h3 className="text-3xl font-heading font-bold mb-6">My Commitment to You</h3>
              <div className="space-y-4 text-lg leading-relaxed text-navy-100">
                <p>
                  <strong className="text-white">Confidentiality:</strong> Your stories, ideas, and identity are completely protected. I sign NDAs as standard practice.
                </p>
                <p>
                  <strong className="text-white">Your Voice, Your Rights:</strong> The content I create sounds authentically you, and you own all rights upon completion.
                </p>
                <p>
                  <strong className="text-white">Quality & Collaboration:</strong> I work iteratively with your feedback until you're completely satisfied with the result.
                </p>
                <p>
                  <strong className="text-white">Professional Excellence:</strong> Every project receives the same dedication, research, and craft, regardless of size.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      <CTASection
        heading="Let's Work Together"
        description="Ready to share your story with the world? I'm here to help"
        buttonText="Schedule a Free Consultation"
        buttonHref="/contact"
        variant="gold"
      />
    </>
  );
}
