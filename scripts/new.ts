import path from 'node:path'
import prompts from 'prompts'
import type { PromptObject } from 'prompts'
import { format } from 'date-fns'
import handlebars from 'handlebars'

const date = new Date()

const questions: PromptObject[] = [
  {
    type: 'select',
    name: 'type',
    message: 'Type?',
    choices: [
      { title: 'Blog', value: 'blog' },
      { title: 'Works', value: 'works' },
    ],
  },
  {
    type: 'text',
    name: 'slug',
    message: 'Slug?',
    initial: format(date, 'yyyyMMdd'),
  },
  {
    type: 'text',
    name: 'title',
    message: 'Title?',
    validate: value => value ? true : false,
  },
  {
    type: 'text',
    name: 'description',
    message: 'Description?',
  },
  {
    type: 'list',
    name: 'tags',
    message: 'Tags?',
  },
  {
    type: 'date',
    name: 'publishDate',
    message: 'Publish date?',
    initial: date,
    mask: 'YYYY-MM-DD',
  },
]

const res = await prompts(questions)

const basePath = path.join(import.meta.dirname, `../src/content/${res.type}`)

const template = handlebars.compile(await Bun.file(path.join(basePath, '_template/index.mdx')).text())

const outPath = path.join(basePath, `${res.slug}/index.mdx`)

await Bun.write(outPath, template({
  ...res,
  tags: res.tags.filter((t: string) => t),
  publishDate: format(res.publishDate, 'yyyy-MM-dd'),
}))

console.log(`done => ${outPath}`)
