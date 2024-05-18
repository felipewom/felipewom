/**
 * README Generator
 */
const md = require('markdown-it')({
    html: true,
    linkify: true,
    breaks: true
});
const mdEmoji = require('markdown-it-emoji');
const fs = require('fs');
const axios = require('axios');

md.use(mdEmoji);

const BLOG_HOST = `https://felipewom.dev`;

/* README Sections */
const introTitle = generateTitle(2, `Hey there :wave:, I'm ${generateLink('Feli', 'https://felipewom.dev/')}`);
const introDescription = [
    `I'm senior software engineer at **${generateLink('NimbleLA', 'https://nimble.la/')}**.`,
    `Converting coffee into code since 2012.`,
    `I'm passionate about **distributed systems**, **serverless architectures**, **AI**, and **development**.`,
    `I'm also a **father** of three beautiful children and a loving **husband**.👨👩[...(👦👧👶), ...(🐶🐶🐶🐱)].`,
    `I'm always looking for new challenges and opportunities, if you have something interesting, let's talk! **${generateLink('Calendly', 'https://calendly.com/felipewom')}**`
];

const notice = `:warning: **I'm currently refactoring my README, so it may be a little messy.**`;

const badgeConfigs = [
    {
        name: 'WhatsApp',
        badgeText: '+5548996132214',
        labelBgColor: '25D366',
        logoBgColor: '25D366',
        logo: 'WhatsApp',
        url: 'https://img.shields.io/badge/WhatsApp-25D366?logo=whatsapp&logoColor=fff&style=for-the-badge',
        link: 'https://wa.me/5548996132214',
    },
    {
        name: 'Calendly',
        badgeText: 'Schedule a meeting',
        labelBgColor: '00A2FF',
        logoBgColor: '00A2FF',
        logo: 'Calendly',
        url: 'https://img.shields.io/badge/Calendly-006BFF?logo=calendly&logoColor=fff&style=for-the-badge',
        link: 'https://calendly.com/felipewom',
    },
    {
        name: 'LinkedIn',
        badgeText: '@felipewom',
        labelBgColor: '0077B5',
        logoBgColor: '0077B5',
        logo: 'LinkedIn',
        link: 'https://www.linkedin.com/in/felipewom/',
    },
    {
        name: 'Website',
        badgeText: 'felipewom.dev',
        labelBgColor: '4E69C8',
        logoBgColor: '4E69C8',
        logo: 'Firefox',
        link: 'https://felipewom.dev',
    },
    {
        name: 'DevTo',
        badgeText: '@felipewom',
        labelBgColor: '0A0A0A',
        logoBgColor: '0A0A0A',
        logo: 'dev.to',
        link: 'https://dev.to/felipewom',
    },
    {
        name: 'Spotify',
        badgeText: '@felipewom',
        labelBgColor: '1ED760',
        logoBgColor: 'fff',
        logo: 'Spotify',
        link: 'https://open.spotify.com/user/12150073684',
    }
];
const badges = badgeConfigs.reduce((result, config) => result + ' ' + generateBadge(config), '');

const gif = `<img align="right" src="https://media1.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" />`;
const factsTitle = generateTitle(2, `:zap: A Few Quick Facts`);
const factsConfigs = [
    `🔭 I’m currently working on [MennyAI](https://menny.ai).`,
    `🌱 I’m currently studying to get postgraduate degree in **Distributed Systems Architecture**.`,
    `🧐 Learning about **automate workflow with ai agents**, **serverless architectures**, and a bit of **training large models**.`,
    `👨‍💻 Most of my projects are available on [Github](https://github.com/felipewom).`,
    `📝 I'm <del>starting</del> writing articles on [my blog](${BLOG_HOST}).`,
    `💬 Ping me to talk about **distributed systems**, **serverless architectures**, **AI**, **development**, and **food**.`,
    `📙 Check out my [resume](https://www.linkedin.com/ambry/?x-li-ambry-ep=AQLy_tN9uZkERgAAAY-NRuu0-kzLr_IRkWgPKiHRuSEko6s7Cowbf3j3qjGiqrqSHczMGJBdhKBbLEeQK-cD3yQP1oa2hCTs7VCFCq7LYOMXsfupKW_yVyS4Rj_adChV-dTw0OT6W2YLDKZsr-cssQvxu4Z3if8BumfoygqNiSu7hEBxjVCuBze8r64qq5HWBJI-NQl6vQX3ZVEqsxgfd29uK1L-C4aauGCoMNxELeiBMWsufcgqnDxnBm9D-anV7giWemQoFHaOYZozIMem8GPaxnQhRkIuDfaBhCZxWgAOCJD7NSsHj7cwHK5ZHs8Anh226DIyodVTvXhaQix5dE3uK89JysTvfHXW6Bip75MAgwaJuNTOmC1EO7ooNJKtdkNIxtMLg-sG4gnuFv4NuDQUL8yImuI81XDFrftR2Y5C1Z8jigfC5btWjDSO8JvykE_3-FJH7WVYkOf2G_DRyvE967YkmxMhr4RbF6Sd2J1drorCmBMTF-4HppLVxKCOkwkuVXULoj8VPvhtWawFvTLl0P9zOaOj01f94ggfhTJVYKZz5r-UAwiOcuRWsEhA52LP&x-ambry-um-filename=FelipeMoura-Resume.pdf).`,
    `🎉 Fun Fact: Whenever I find myself in the midst of a chaotic day at home, I gently remind myself: I am not merely a father, but also a proficient programmer deftly managing a complex, real-life system! 😊`,
];
const facts = factsConfigs.reduce((result, fact) => result + `\n - ${fact}`, '');

const postsTitle = generateTitle(2, `:black_nib: Recent Posts (WIP)`);

const toolsTitle = generateTitle(2, `:rocket: Tools and Technologies`);
const toolsIconSize = 25;
const toolsConfig = [
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg',
        alt: 'nodejs',
    },
    {
        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
        alt: 'Go',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
        alt: 'javascript',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
        alt: 'typescript',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg',
        alt: '.NET',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg',
        alt: 'react',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg',
        alt: 'tailwindcss',
    },
    {
        src: 'https://seeklogo.com/images/S/shadcn-ui-logo-EF735EC0E5-seeklogo.com.png',
        alt: 'shadcnui',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
        alt: 'mongodb',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg',
        alt: 'postgresql',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg',
        alt: 'mysql',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg',
        alt: 'redis',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg',
        alt: 'nginx',
    },
    {
        src: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/aws/aws.png',
        alt: 'aws',
    },
    {
        src: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg',
        alt: 'gcp',
    },
    {
        src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
        alt: 'Docker',
    },
];
const tools = toolsConfig.reduce((result, toolConfig) => result + '\n' + generateIcon(toolConfig, toolsIconSize), '');

const stats = `<img src="https://github-readme-stats.vercel.app/api?username=felipewom&show_icons=true&count_private=true" alt="felipewom" />`;

// Count is down, will they ever recover from this catastrophe? https://github.com/jwenjian/visitor-badge/issues/32
// const visitors = `![visitors](https://visitor-badge.glitch.me/badge?page_id=felipewom.felipewom)`;
const visitors = `[![HitCount](https://hits.dwyl.com/felipewom/felipewom/felipewom.svg?style=flat-square)](http://hits.dwyl.com/felipewom/felipewom/felipewom.svg?style=flat-square)`;

(async () => {

    // Get blog entries
    const response = await axios.get(`${BLOG_HOST}/page-data/index/page-data.json`);
    const postData = response.data?.result?.data?.allMarkdownRemark?.edges || [];
    let posts = ``;

    postData.slice(0, Math.min(postData.length, 5)).map(post => {
        const title = post.node.frontmatter.title;
        const date = post.node.frontmatter.date;
        const path = post.node.frontmatter.path;
        posts += `<li><a target="_blank" href="${BLOG_HOST}${path}">${title} — ${date}</a></li>`;
    });

    const content = `${introTitle}\n
${badges}\n
${introDescription.join('\n')}\n
${notice}\n
${gif}\n
${factsTitle}\n
${facts}\n
${postsTitle}\n
<details>
    <summary>Explore</summary>
    ${posts}\n
</details>\n
<a target="_blank" href="${BLOG_HOST}">Read More</a>\n
${toolsTitle}\n
<p align="left">\n
    ${tools}\n
</p>\n
${stats}\n
${visitors}
`;

    const markdownContent = md.render(content);

    fs.writeFile('./README.md', markdownContent, (err) => {
        if (err) {
            return console.error(err);
        }
        console.info(`Writing to README.md`);
    });
})();

function generateBadge(badgeConfig) {
    if (badgeConfig.url) {
        return `[![${badgeConfig.name} Badge](${badgeConfig.url})](${badgeConfig.link})`;
    }
    return `[![${badgeConfig.name} Badge](https://img.shields.io/badge/-${badgeConfig.badgeText}-${badgeConfig.labelBgColor}?style=for-the-badge&labelColor=${badgeConfig.logoBgColor}&logo=${badgeConfig.logo}&link=${badgeConfig.link})](${badgeConfig.link})`;
}

function generateIcon(iconConfig, toolsIconSize) {
    return `<img src="${iconConfig.src}" alt="${iconConfig.alt}" width="${toolsIconSize}" height="${toolsIconSize}" />`;
}

function generateTitle(size, title) {
    return `${'#'.repeat(size)} ${title}`;
}

function generateLink(label, link) {
    return `[${label}](${link})`;
}
