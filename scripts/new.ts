import fs from 'node:fs'
import path from 'node:path'
import prompts from 'prompts'
import type { PromptObject } from 'prompts'
import { format } from 'date-fns'
import handlebars from 'handlebars'

const date = new Date()

const { type } = await prompts([{
  type: 'select',
  name: 'type',
  message: 'Type?',
  choices: [
    { title: 'Blog', value: 'blog' },
    { title: 'Works', value: 'works' },
  ],
}], { onCancel: () => { throw Error('Canceled') } })

const basePath = path.join(import.meta.dirname, `../src/content/${type}`)

const { slug } = await prompts([{
  type: 'text',
  name: 'slug',
  message: 'Slug?',
  initial: 'some-title',
  validate: slug => {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return 'Invalid format!'
    try {
      fs.accessSync(path.join(basePath, slug), fs.constants.F_OK)
    } catch {
      return true
    }
    return 'Slug exists!'
  },
}], { onCancel: () => { throw Error('Canceled') } })

const questions: PromptObject[] = [
  {
    type: 'text',
    name: 'title',
    message: 'Title?',
    validate: title => title ? true : false,
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

const res = await prompts(questions, { onCancel: () => { throw Error('Canceled') } })

fs.cpSync(path.join(basePath, '_template'), path.join(basePath, slug), { recursive: true });

const template = handlebars.compile(await Bun.file(path.join(basePath, '_template/index.mdx')).text())

const outPath = path.join(basePath, `${slug}/index.mdx`)

await Bun.write(outPath, template({
  ...res,
  tags: res.tags.filter((t: string) => t),
  publishDate: format(res.publishDate, 'yyyy-MM-dd'),
}))

console.log(`done => ${outPath}`)
