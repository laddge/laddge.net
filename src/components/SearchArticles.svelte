<script lang="ts">
  import Fuse from 'fuse.js'
  import queryString from 'query-string'

  import ArticleList from '@/components/ArticleList.svelte'
  import type { Article } from '@/lib/getArticles'

  export let allArticles: Article[]

  const fuse = new Fuse(allArticles, {
    keys: ['title', 'tags'],
    shouldSort: false,
    useExtendedSearch: true,
  })
  let qsLoaded = false
  let articles: Article[] = allArticles
  let tab: number
  let query = ''
  let tags: string[] = []

  $: {
    if (typeof window !== 'undefined') {
      if (!qsLoaded) {
        const parsed = queryString.parse(window.location.search)
        qsLoaded = true
        tab = Number(parsed.tab)
        if (parsed.tags) {
          if (parsed.tags.length) {
            tags = parsed.tags
          }
        }
      }
      if (!Number.isInteger(tab) || tab < 0 || tab >= 4) {
        tab = 0
      }
      const url = queryString.parseUrl(window.location.href, { parseFragmentIdentifier: true })
      url.query.tab = `${tab}`
      url.query.tags = tags
      window.history.pushState({}, '', queryString.stringifyUrl(url))
      if (query) {
        articles = fuse.search(query).map((item) => item.item)
      } else {
        articles = allArticles
      }
      if (tags.length) {
        articles = articles.filter(
          (article) => article.tags.filter((tag) => tags.indexOf(tag) != -1).length
        )
      } else {
        articles = articles
      }
    }
  }
</script>

<div class="search-block p-6 mb-8 rounded-box border">
  <input
    type="text"
    placeholder="Search"
    bind:value={query}
    class="input input-bordered input-primary w-full"
  />
  <div class="pt-3">
    <h3 class="text-xl font-bold mb-1"># tags</h3>
    <div class="overflow-auto h-44 bg-base-100 border rounded-lg px-2">
      {#each Array.from(new Set([].concat(...allArticles.map((article) => article.tags))))
        .sort()
        .filter((tag) => tags.indexOf(tag) != -1) as tag}
        <label class="block flex items-center gap-2 my-2">
          <input
            type="checkbox"
            bind:group={tags}
            value={tag}
            class="checkbox checkbox-sm checkbox-primary"
          />
          {tag}
        </label>
      {/each}
      {#each Array.from(new Set([].concat(...allArticles.map((article) => article.tags))))
        .sort()
        .filter((tag) => tags.indexOf(tag) == -1) as tag}
        <label class="block flex items-center gap-2 my-2">
          <input
            type="checkbox"
            bind:group={tags}
            value={tag}
            class="checkbox checkbox-sm checkbox-primary"
          />
          {tag}
        </label>
      {/each}
    </div>
  </div>
</div>
<div class="tabs tabs-bordered mt-2 mb-4">
  {#each { length: 4 } as _, i}
    <label class={`grow tab tab-bordered ${tab == i ? 'tab-active' : ''}`}>
      <input type="radio" bind:group={tab} name="tab" value={i} class="hidden" />
      {['All', 'Blog', 'Qiita', 'Zenn'][i]}
      <div class="badge badge-sm text-current border-current ml-2">
        {#if i == 0}
          {articles.length}
        {:else if i == 1}
          {articles.filter((article) => article.articleType == 0).length}
        {:else if i == 2}
          {articles.filter((article) => article.articleType == 1).length}
        {:else if i == 3}
          {articles.filter((article) => article.articleType >= 2).length}
        {/if}
      </div>
    </label>
  {/each}
</div>
{#if tab == 1}
  <ArticleList articles={articles.filter((article) => article.articleType == 0)} />
{:else if tab == 2}
  <ArticleList articles={articles.filter((article) => article.articleType == 1)} />
{:else if tab == 3}
  <ArticleList articles={articles.filter((article) => article.articleType >= 2)} />
{:else}
  <ArticleList {articles} />
{/if}

<style>
  .search-block {
    background-image: repeating-linear-gradient(
      45deg,
      hsl(var(--b1)),
      hsl(var(--b1)) 13px,
      hsl(var(--b2)) 13px,
      hsl(var(--b2)) 14px
    );
  }
</style>
