import { getCollection } from 'astro:content'
import axios from 'axios'
import { JSDOM } from 'jsdom'

export interface Article {
  slug: string
  href: string
  title: string
  tags: string[]
  pubDate: Date
  image: string
  articleType: number
}

const getDOM = async (url: string) => {
  const res = await axios.get(url)
  return new JSDOM(res.data)
}

export const getArticles = async () => {
  const blogEntries = await getCollection('blog', ({ data }) => {
    return data.draft !== true
  })
  const articles: Article[] = blogEntries.map((entry) => ({
    slug: entry.slug,
    href: '/blog/' + entry.slug,
    title: entry.data.title,
    tags: entry.data.tags,
    pubDate: entry.data.pubDate,
    image: entry.data.image,
    articleType: 0,
  }))

  const qRes = await axios.get('https://qiita.com/api/v2/items?perpage=100;query=user:laddge', {
    headers: { Authorization: 'Bearer 072114f0c0c2cb62d76729b19dba8ce6534cc3dd' },
  })
  for (const item of qRes.data) {
    const meta = (await getDOM(item.url)).window.document.querySelector(
      'meta[property="og:image"]'
    ) as HTMLMetaElement
    const image = meta ? meta.content : ''

    articles.push({
      slug: item.id,
      href: item.url,
      title: item.title,
      tags: item.tags.map((tag: { name: string }) => tag.name),
      pubDate: new Date(item.created_at),
      image,
      articleType: 1,
    })
  }

  const zaRes = await axios.get('https://zenn.dev/api/articles?username=laddge')
  for (const item of zaRes.data.articles) {
    const doc = (await getDOM(`https://zenn.dev${item.path}`)).window.document
    const tags: string[] = Array.from(
      doc.querySelectorAll('a[href^="/topics"] > div[class^="View_topicName"]')
    )
      .map((el) => (el.textContent ? el.textContent : ''))
      .filter((tag) => tag != '')
    const meta = doc.querySelector('meta[property="og:image"]') as HTMLMetaElement
    const image = meta ? meta.content : ''

    articles.push({
      slug: item.id,
      href: `https://zenn.dev${item.path}`,
      title: item.title,
      tags,
      pubDate: new Date(item.published_at),
      image,
      articleType: 2,
    })
  }

  const zsRes = await axios.get('https://zenn.dev/api/scraps?username=laddge')
  for (const item of zsRes.data.scraps) {
    const meta = (await getDOM(`https://zenn.dev${item.path}`)).window.document.querySelector(
      'meta[property="og:image"]'
    ) as HTMLMetaElement
    const image = meta ? meta.content : ''

    articles.push({
      slug: item.id,
      href: `https://zenn.dev${item.path}`,
      title: item.title,
      tags: item.topics.map((topic: { display_name: string }) => topic.display_name),
      pubDate: new Date(item.last_comment_created_at),
      image,
      articleType: 3,
    })
  }

  return articles.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf())
}
