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

<div class="search-block p-6 mb-8 rounded-box border grid gap-4">
  <input
    type="text"
    placeholder="Search"
    bind:value={query}
    class="input input-bordered input-primary w-full"
  />
  {#if tags.length}
    <div class="flex flex-wrap">
      {#each Array.from(new Set([].concat(...allArticles.map((article) => article.tags))))
        .sort()
        .filter((tag) => tags.indexOf(tag) != -1) as tag}
        <div class="bg-base-200 px-2 py-1 rounded flex items-center mr-2 my-1 text-sm">
          #{tag}
          <label class="btn btn-sm btn-ghost p-0 h-auto min-h-0 ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            <input type="checkbox" bind:group={tags} value={tag} class="hidden" />
          </label>
        </div>
      {/each}
    </div>
  {/if}
  <div class="dropdown">
    <button class="btn btn-sm btn-block">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="currentColor"
        class="h-4 w-4"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      #tag
    </button>
    <ul
      tabindex="-1"
      class="dropdown-content z-[1] menu block sm:flex p-2 border shadow-lg bg-base-100 rounded-box overflow-auto h-[calc(11rem+1px)] w-full mt-2"
    >
      {#each Array.from(new Set([].concat(...allArticles.map((article) => article.tags)))).sort() as tag}
        <li class="p-1">
          <label class={`px-2 py-1 ${tags.indexOf(tag) !== -1 ? 'bg-base-200' : ''}`}>
            <input type="checkbox" bind:group={tags} value={tag} class="hidden" />
            #{tag}
          </label>
        </li>
      {/each}
    </ul>
  </div>
</div>
<div class="tabs tabs-bordered mt-2 mb-4">
  {#each { length: 4 } as _, i}
    <label class={`grow tab tab-bordered px-1 ${tab == i ? 'tab-active' : ''}`}>
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
      oklch(var(--b1)),
      oklch(var(--b1)) 13px,
      oklch(var(--b2)) 13px,
      oklch(var(--b2)) 14px
    );
  }
</style>
