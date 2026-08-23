import { motion } from "motion/react";

function MyWish() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="
        mx-auto
        w-[90%]
        sm:w-[80%]
        md:w-[70%]
        lg:w-[60%]
        xl:w-[50%]
        rounded-3xl
        bg-white/80
        backdrop-blur-md
        px-6
        py-8
        mb-16
        sm:px-8
        sm:py-10
        md:px-12
        md:py-12
        shadow-[0_0_30px_rgba(229,107,138,0.35)]
      "
    >
      <div className="relative py-16 sm:py-20 md:py-24">
        
        {/* Opening quote */}
        <span
          className="
            absolute
            top-0
            left-0
            text-6xl
            font-bold
            leading-none
            text-[#E56B8A]
            sm:text-7xl
            md:text-8xl
            lg:text-9xl
          "
        >
          “
        </span>

        {/* Message */}
        <p
          className="
            px-6
            text-center
            text-lg
            leading-relaxed
            text-[#4B5563]
            sm:px-10
          "
        >
          Iwi my love, I can’t even construct the words to tell you how much I love you and how much you mean to me, so I decided to build you something on the internet because “…everything you do on the internet is on the internet forever"  right? 
          <br />
          <br />

          It’s my hope and prayer that you never feel unloved. But given that as human beings we may, I hope that if you ever feel that way, someday, I want you go to kokos24th.com  and bask yourself in all the love we all have for you.
          <br />
          <br />

          Reading all the wishes from everyone while building this, really warmed my heart. It feels really good to see that your friends have such beautiful things to say about you and it hits even more differently knowing that the person in question is my sister and people also get to experience how beautiful and amazing you are.
          <br />
          <br />

          I’m getting so emotional writing this wish, you’re more than my sister, you’re my best friend and I’m so grateful to have both in 1 person. Remember I always tell you that I doubt I’d be able to survive or  do life without you in it and you’ll always say “Chioma abeg abeg abeg…..” But that’s the honest truth, you are everything to me. I love how we love each other. I love how intentional we are about each other. I love how we never stop caring for each other. Regardless of the different opinions we share, it never gets in the way of our bond and our relationship. 
          <br />
          <br />

          You deserve all the good things life has to offer, all the love, all the care, all the abundance , and all the grace.  I hope you actually realise that your name always goes before you where ever you go, you are always highly favoured and that favour will never depart from your life. I want you to know that God has not started with you yet. Remember your Hallelujah Challenge last year? As well as mine for you last year as well?  I feel so good watching you live in your answered prayers, God is too good honestly and I hope that is all the proof you need  to see how much of Gods favourite you are and I hope you never forget that.
          <br />
          <br />

          My prayer for you is that you keep you keep being surrounded in so much love, you keep growing in wisdom and good health. I pray that the sky remains your starting point. I pray that this is the least you ever be in all aspects of your life. Favour and grace will single you out each time, Gods face will keep shinning on you and you will always stand out for all the right reasons never the wrong ones. You will never know a better yesterday. I pray that you always do well. May nothing die in your hands, not your dreams or goals and certainly not your loved ones. May your life keep shinning like a shinning light that keeps shining brighter and brighter. I pray that you never stop being you and you never change who you are no matter what. I pray you remain true to yourself and you keep getting wiser and may every thing always work out for your good.  I also pray, that moving forward in this new journey, you know what I’m talking about 😋 that God guides you every step of the way through it. You won’t ever regret your decision and God will always have your back.
          <br />
          <br />

          I want you to know I love you so much more than words can ever describe and more than any website I’d ever build. The best is honestly yet to come and I thank you for being my sister and my everything. Thank you for always loving me. 

        </p>

        <p className="mt-6 md:mt-8 text-center text-sm sm:text-base md:text-lg font-semibold text-[#E56B8A]">
            — Chi ❤️
        </p>

        {/* Closing quote */}
        <span
          className="
            absolute
            bottom-0
            right-0
            text-6xl
            font-bold
            leading-none
            text-[#E56B8A]
            sm:text-7xl
            md:text-8xl
            lg:text-9xl
          "
        >
          ”
        </span>
      </div>
    </motion.div>
  );
}

export default MyWish;


