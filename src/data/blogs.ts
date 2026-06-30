export type BlogTable = {
    caption: string;
    headers: string[];
    rows: string[][];
};

export type BlogSection = {
    title: string;
    body: string[];
    table?: BlogTable;
};

export type BlogResource = {
    label: string;
    href: string;
};

export type BlogPost = {
    slug: string;
    title: string;
    description: string;
    disclaimer: string;
    publishedAt: string;
    readingTime: string;
    tags: string[];
    sections: BlogSection[];
    takeaways: string[];
    resources: BlogResource[];
};

export const blogPosts: BlogPost[] = [
    {
        slug: "save-your-parents-mental-health-and-wellbeing",
        title: "Save Your Parents' Mental Health and Wellbeing",
        description:
            "**Your child is not competing with BJP or Congress.** They are competing with your phone.",
        disclaimer:
            "This is personal writing, not medical advice, and not an argument for BJP, Congress, the right, or the left. It is about what **constant outrage and phone distraction** can do to families.",
        publishedAt: "Jun 30, 2026",
        readingTime: "10 min read",
        tags: ["family", "parenting", "social-media"],
        sections: [
            {
                title: "TL;DR from the sources",
                body: [
                    "**Read this block even if you skip the rest.**",
                    "- India is not dealing with a niche habit. The IAMAI-Kantar Internet in India 2024 report estimated **886 million active internet users**, and IAMAI's media page now points to 2025 coverage crossing **950 million active users**. This is not a teenager problem. It is inside ordinary homes.",
                    "- Yale researchers found that likes and shares can teach people to express more moral outrage over time. **Outrage does not just appear. It can be trained.**",
                    "- A PNAS Nexus algorithmic audit found that **engagement-based ranking can amplify emotional, partisan, and out-group hostile political content** when compared with a reverse-chronological feed.",
                    "- The U.S. Surgeon General's youth advisory warns about social media risks, recommends family media plans, tech-free zones, and responsible adult modeling.",
                    "- A 2024 Frontiers study found that when parents were distracted during interaction, the quality of parent-child interaction deteriorated and parental communication declined. **The core issue was the parent's attention moving away from the child.**",
                    "- Springer research on technoference is careful: phones can help parents cope, connect, and find support, but repeated device interruptions can still damage responsiveness and relationship quality.",
                    "So this is not a simple phones-are-evil article. It is simpler and more personal: if political content keeps hijacking your mood, **your child is competing with your phone.**",
                ],
            },
            {
                title: "The new tiredness inside Indian homes",
                body: [
                    "There is a new kind of tiredness inside many Indian homes. It does not look like the old tiredness of work, traffic, loans, relatives, school fees, and office politics. That tiredness was heavy, but visible.",
                    "This one is stranger. The parent is at home. Dinner is on the table. The child is nearby. Everybody is physically together, but one ping is enough to pull the parent into another emotional climate.",
                    "A political reel appears. A WhatsApp forward lands. A news anchor shouts. A leader is clipped out of context. A religious controversy, a crime video, a war update, a celebrity scandal, a boycott, a protest, a betrayal, a new outrage.",
                    "Within seconds, **the parent's face changes**. The jaw tightens. The mood shifts. The voice becomes sharper. The child says something small, and the parent snaps.",
                    "The child does not understand nationalism, secularism, fascism, democracy, capitalism, feminism, geopolitics, or the constitution. The child understands only one thing: **my parent is here, but not with me.**",
                ],
            },
            {
                title: "This article may be about you",
                body: [
                    "This article may be about you if you open your phone to relax but **close it feeling angry.**",
                    "It may be about you if you know more about what happened in Delhi, Washington, Gaza, Moscow, or Manipur than what happened inside your own child's mind today.",
                    "It may be about you if a 60-second reel gives you enough confidence to form a strong opinion.",
                    "It may be about you if you regularly use words like bhakt, libtard, sickular, anti-national, fascist, woke, godi media, WhatsApp University, or urban naxal.",
                    "It may be about you if you think the other side is not just wrong, but stupid, evil, brainwashed, dangerous, or anti-India.",
                    "It may be about you if your child has to **repeat something three times** because you are looking at your phone.",
                    "It may be about you if **your mood at home depends on what the algorithm showed you today.**",
                    "And it is definitely about you if you think this article is only about **the other side.**",
                ],
            },
            {
                title: "Two political parents, one nervous system",
                body: [
                    "In Indian homes, two online political personalities are now common.",
                    "These are not perfect categories. People are complicated. Not every right-wing person is angry. Not every left-wing person is self-righteous. Not every BJP supporter is communal. Not every Congress supporter is elitist.",
                    "But online, the comparison is uncomfortable:",
                    "Both feel informed. Both feel morally correct. Both feel surrounded by idiots. Both feel the other side is destroying India. Both are constantly stimulated. And **both may be becoming less available to their own families.**",
                    "**Different gods. Same addiction.**",
                ],
                table: {
                    caption: "How opposite political feeds can train the same emotional pattern at home.",
                    headers: ["Pattern", "BJP/right-wing parent", "Congress/liberal/left-wing parent", "Same underlying effect"],
                    rows: [
                        [
                            "Core fear",
                            "Country, culture, religion, and values will be destroyed.",
                            "Democracy, minorities, constitutional values, and freedom will be destroyed.",
                            "**The nervous system stays on alert.**",
                        ],
                        [
                            "Protection story",
                            "The nation is in danger.",
                            "Democracy is in danger.",
                            "**Emergency mode becomes normal.**",
                        ],
                        [
                            "Enemy label",
                            "They are anti-national.",
                            "They are fascist.",
                            "**People become categories instead of human beings.**",
                        ],
                        [
                            "Content diet",
                            "Angry YouTube clips, WhatsApp forwards, leader edits, TV debate cuts.",
                            "Angry explainers, Instagram slides, political podcasts, media-capture threads.",
                            "**The feed rewards outrage** and keeps the parent hooked.",
                        ],
                        [
                            "Home cost",
                            "Feels patriotic, but becomes sharper with family.",
                            "Feels morally alert, but becomes less patient with family.",
                            "**The child loses the parent's attention either way.**",
                        ],
                    ],
                },
            },
            {
                title: "Outrage addiction disguised as awareness",
                body: [
                    "Social media does not only give information. It gives **emotional injections.**",
                    "You see a negative clip. Your body reacts. Anger comes. Fear comes. Disgust comes. Pride comes. Moral superiority comes. Then you comment, share, forward, argue, abuse, screenshot, or post a story. For a few seconds, you feel alive. You feel involved. You feel like a responsible citizen.",
                    "But the platform has learned something more important than your opinion: this person reacts to outrage. **Show them more outrage.**",
                    "Slowly, a feed becomes a training program. A small irritation becomes daily anger. **Daily anger becomes a personality.** The parent starts living in a constant state of mental agitation.",
                    "Some people call this dopamine addiction. That is partly true, but incomplete. The hook is not only pleasure. It is novelty, reward, fear, identity, belonging, anger, and the delicious feeling of being right.",
                    "By neurosis, I do not mean a medical diagnosis. I mean a restless inner state where the mind is anxious, reactive, suspicious, irritated, and unable to relax.",
                    "The parent is not facing one real emergency. The parent is facing twenty-five digital emergencies every day. A crime case. A speech clip. A religious insult. A war update. A fake quote. A market crash. A half-truth. A manipulated video. A reel saying you will not believe what happened next.",
                    "The body does not always know the difference between real danger and digital stimulation. So the parent comes back to the house carrying the emotional dust of the entire internet. **Then the child pays the price.**",
                ],
            },
            {
                title: "Activism, or just emotional consumption?",
                body: [
                    "Every few days, there is a new hashtag, new boycott, new scandal, new national issue, new international issue, new influencer giving a brutal truth, and new clip everyone must react to immediately.",
                    "People post shame, wake up, this country is finished, this is why we need strong leadership, this is why democracy is dying.",
                    "For a few minutes, it feels meaningful. Then nothing happens. The person moves to the next outrage. A week later, they may not even remember what they were angry about.",
                    "That is not activism. That is **emotional consumption.**",
                    "Real activism requires sacrifice, time, risk, consistency, organization, patience, local work, and responsibility. Social media outrage requires a thumb.",
                    "This is why the **house-first rule** matters. Before saving civilization online, ask your child how school was. Before lecturing the nation on democracy, check whether your own home allows people to speak freely. Before defending culture online, check whether you are treating your spouse, parents, children, and workers with dignity.",
                    "There is a crude phrase for the person who has not arranged peace in his own house but is giving a full analysis of Russia, Ukraine, NATO, China, America, oil prices, and civilization: intellectual masturbation.",
                    "A softer version is this: sometimes **online activism is emotional entertainment wearing the clothes of responsibility.**",
                ],
            },
            {
                title: "Comparison without context is self-harm",
                body: [
                    "Political outrage is only one part of the phone problem. Comparison is the other.",
                    "Earlier, success usually came with context. You knew the local businessman, doctor, engineer, teacher, shop owner, or government officer. You knew their age, family background, years of work, luck, failures, responsibilities, and compromises.",
                    "Now a random person can become famous in six months. A 22-year-old can go viral. A creator can show luxury. A trader can show a car. A coach can sell a course. A podcaster can become a celebrity. A person can rent a lifestyle, shoot a video, and look rich.",
                    "Parents start thinking: **what did I do with my life?**",
                    "They forget the rent they paid, the loans they cleared, the relatives they helped, the parents they cared for, the illnesses they survived, the children they raised, and the dignity of honest work.",
                    "Social media shows the result and hides the ingredients: inheritance, debt, editing, luck, family support, fake numbers, rented assets, anxiety, failed attempts, and compromise.",
                    "Then that insecurity gets passed to the child. Look at Sharma ji's son. Look at that girl on Instagram. See how much people are earning at your age. Why are you not doing something big?",
                    "But the child is not being compared to reality. **The child is being compared to advertising.**",
                    "Comparison with context can teach. **Comparison without context only bleeds.**",
                ],
            },
            {
                title: "Your feed is not the country",
                body: [
                    "Many older people understand newspapers, TV channels, radio, and real conversations. But algorithmic feeds are different. They do not show you the world. They show you a customized reality.",
                    "If you watch right-wing anger, the platform gives more right-wing anger. If you watch left-wing anger, it gives more left-wing anger. If you pause on fear, it gives more fear. If you comment on hate, it gives more hate. If you share conspiracy, it gives more conspiracy.",
                    "Slowly, the feed becomes a mirror. Then the person says everyone is saying this.",
                    "No. Everyone is not saying this. **Your algorithm is saying this.**",
                    "That is how echo chambers kill nuance. You mostly hear people who sound like you. You mostly see evidence that confirms what you already believe. You slowly stop meeting intelligent disagreement.",
                    "Once your mind is trained to see strangers without nuance, you may start seeing your own family without nuance too. You interrupt more. You assume bad intention faster. You become impatient. You lecture instead of listening. You react instead of understanding.",
                    "The worst effect of political social media is that it does not stay on the phone. **It enters the dining table.**",
                ],
            },
            {
                title: "What children actually feel",
                body: [
                    "Children do not need perfect parents. **They need available parents.**",
                    "They need a mother or father who can listen without checking notifications. They need adults who can regulate emotions. They need slow conversations, eye contact, patience, predictable love, and the feeling that when they speak, someone is actually receiving them.",
                    "But overstimulated parents become unpredictable. One day calm. Next day angry because of a clip. One moment laughing. Next moment shouting because a politician said something.",
                    "The child says, Papa, see what I made. Papa says, one second, while watching a reel. The child says, Mummy, listen. Mummy says, wait, while replying to a political argument.",
                    "The child slowly learns: **my parent's phone is more important than my voice.**",
                    "The Frontiers study matters here because it points to attention itself. Whether distraction is digital or non-digital, interaction quality drops when the parent is mentally elsewhere. Phones are not magical villains. But phones are built to pull attention again and again.",
                    "Political outrage adds one more layer. A distracted parent is absent. **An outraged parent is absent and emotionally unsafe.**",
                    "A child may not say it clearly, but the child feels the emotional weather of the room changing because of a stranger's post. That is too much power to give to an algorithm.",
                ],
            },
            {
                title: "How to take back the house",
                body: [
                    "The solution is not to become ignorant. The solution is not to stop caring about India. The solution is not to delete every app and move to a mountain.",
                    "The solution is to **take back control of attention.**",
                    "**Start with one week, not one lifetime.**",
                    "This sounds simple, but it is radical. The modern phone has entered every corner of the house. Taking back one corner is an act of resistance against unconscious living.",
                ],
                table: {
                    caption: "Small household moves that reduce outrage-driven phone distraction.",
                    headers: ["Move", "What it looks like", "Why it helps"],
                    rows: [
                        [
                            "Seven-day political fast",
                            "No political reels, outrage clips, TV debate cuts, WhatsApp forwards, angry explainers, comment fights, or trending hashtags unless truly necessary.",
                            "You find out whether you are **naturally angry or being made angry every day.**",
                        ],
                        [
                            "Reset the feed",
                            "Unfollow rage accounts, mute political keywords, leave toxic WhatsApp groups, clear watch history, press not interested, and turn off notifications.",
                            "Your phone stops acting like **an outrage machine by default.**",
                        ],
                        [
                            "Listen across the aisle",
                            "Once a week, listen to a calm, serious person from the other side. Not a troll. Not a shouting spokesperson.",
                            "It protects your mind from becoming **allergic to nuance.**",
                        ],
                        [
                            "Check screen time",
                            "Ask which apps took your day, whether you felt better after using them, and whether your child saw more of your face or your phone.",
                            "**You cannot change a habit you refuse to measure.**",
                        ],
                        [
                            "Pause before reacting",
                            "When a post creates anger, fear, disgust, or moral superiority, ask what is missing and who benefits if you react immediately.",
                            "It stops strangers online from controlling **the emotional weather of your home.**",
                        ],
                        [
                            "Make phone-free zones",
                            "Dining table, first hour after waking, last hour before sleep, and any moment when your child is talking.",
                            "It turns attention back into **a family habit, not a rare event.**",
                        ],
                    ],
                },
            },
            {
                title: "Consume slower, think better",
                body: [
                    "Do not form your worldview from **60-second reels.** A reel can introduce a topic. It should not become your final opinion.",
                    "Use books, long interviews, serious podcasts, documentaries, credible journalists, primary sources, and people who admit uncertainty.",
                    "Be careful of anyone who makes every issue sound simple. Be careful of anyone who turns every tragedy into proof that their side was always right. Be careful of anyone who never criticizes their own side. Be careful of anyone who gives you constant enemies.",
                    "Short-form content is good for attention. **It is dangerous for understanding.**",
                    "Netflix's The Social Dilemma is useful here, not because it answers everything, but because it helps normal people see that social media is not a neutral room where posts appear randomly. It is a system designed to hold attention.",
                    "And anger holds attention very well.",
                ],
            },
            {
                title: "House first",
                body: [
                    "Before reacting to a national issue, ask a smaller question: **have I done what my own house needed today?**",
                    "Have I spoken properly to my child? Have I checked on my spouse? Have I taken care of my health? Have I done my work honestly? Have I reduced chaos in my own home?",
                    "This does not mean society does not matter. It means society should not become an escape from your own duties.",
                    "A person who cannot listen to his child but wants to save civilization is not serious. A person who abuses family members but posts about justice is not serious. A person who is cruel at home but patriotic online is not serious. **A person who is emotionally unavailable but politically updated is not serious.**",
                    "**The home is the first republic. The family is the first democracy. The dining table is the first parliament.**",
                    "Practice there first.",
                ],
            },
            {
                title: "The real questions",
                body: ["The article is not asking you to stop caring about the world. It is asking whether **your concern is still making you a better person at home.**"],
                table: {
                    caption: "The questions that matter more than online political victory.",
                    headers: ["Online question", "House-first question"],
                    rows: [
                        ["Are you right-wing or left-wing?", "Are you emotionally available?"],
                        ["Do you support BJP or Congress?", "Can your child talk to you without **competing with your phone?**"],
                        ["Are you aware of every issue?", "Are you aware of **what your anger is doing to your home?**"],
                        ["Can you defeat the other side online?", "Can you defeat your own compulsive scrolling?"],
                        ["Are you saving India?", "Are you destroying the peace of your own house while pretending to save something bigger?"],
                    ],
                },
            },
            {
                title: "Put the phone down before the child stops trying",
                body: [
                    "One day, your child will stop saying, look at this. One day, they will stop repeating, listen to me. **One day, they will stop coming to you with small stories.**",
                    "Not because they do not need you, but because they learned that you were busy.",
                    "Busy with outrage. Busy with reels. Busy with strangers. Busy with politics. Busy with being right. Busy with the whole world, except the person sitting next to you.",
                    "Your child does not need you to have an opinion on every political issue. **Your child needs you to look up.**",
                    "Your family does not need a father or mother who is constantly updated, constantly angry, constantly reacting, and constantly distracted. They need someone who can sit in silence, listen properly, laugh without checking notifications, disagree without shouting, and care about the country without poisoning the home.",
                    "India may or may not change because of your next post. **But your home can change tonight.**",
                    "**Put the phone down.**",
                    "If you feel like you're not doing any of the above and you're a parent, **please don't lie to yourself.**",
                ],
            },
        ],
        takeaways: [
            "**Your child is not competing with your politics.** They are competing with your attention.",
            "Right-wing outrage and left-wing outrage often use different words but **train the same nervous system.**",
            "**A feed is not the country.** It is a customized reality built from your reactions.",
            "The easiest detox is **seven days without political reels, angry explainers, forwards, and comment fights.**",
            "Use **phone-free zones** before the dining table becomes just another notification surface.",
            "**House first:** fix the emotional climate at home before performing concern for the world.",
        ],
        resources: [
            {
                label: "IAMAI: Internet in India 2024 Kantar-IAMAI report",
                href: "https://www.iamai.in/research/internet-india-2024-kantariamai-report",
            },
            {
                label: "IAMAI: Media coverage for Internet in India 2025",
                href: "https://www.iamai.in/media",
            },
            {
                label: "Yale News: Likes and shares teach people to express more outrage online",
                href: "https://news.yale.edu/2021/08/13/likes-and-shares-teach-people-express-more-outrage-online",
            },
            {
                label: "PNAS Nexus: Engagement and divisive content on social media",
                href: "https://academic.oup.com/pnasnexus/article/4/3/pgaf062/8052060",
            },
            {
                label: "HHS: Social Media and Youth Mental Health",
                href: "https://www.hhs.gov/surgeongeneral/reports-and-publications/youth-mental-health/social-media/index.html",
            },
            {
                label: "Springer: Technoference in parenting",
                href: "https://link.springer.com/chapter/10.1007/978-3-031-69362-5_56",
            },
            {
                label: "Frontiers: Digital and non-digital parental distraction",
                href: "https://www.frontiersin.org/journals/child-and-adolescent-psychiatry/articles/10.3389/frcha.2024.1330331/full",
            },
            {
                label: "Netflix: The Social Dilemma",
                href: "https://www.netflix.com/title/81254224",
            },
        ],
    },
];

export const getBlogPostBySlug = (slug: string | undefined) => {
    return blogPosts.find((post) => post.slug === slug);
};
