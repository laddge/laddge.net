<script lang="ts">
  import queryString from 'query-string'

  import ArticleList from '@/components/ArticleList.svelte'
  import type { Article } from '@/lib/getArticles'

  export let articles: Article[]

  let qsLoaded = false
  let tab: number

  $: {
    if (typeof window !== 'undefined') {
      if (!qsLoaded) {
        const parsed = queryString.parse(window.location.search)
        qsLoaded = true
        tab = Number(parsed.tab)
      }
      if (!Number.isInteger(tab) || tab < 0 || tab >= 4) {
        tab = 0
      }
      const url = queryString.parseUrl(window.location.href, { parseFragmentIdentifier: true })
      url.query.tab = `${tab}`
      window.history.pushState({}, '', queryString.stringifyUrl(url))
    }
  }
</script>

<div class="tabs tabs-boxed">
  {#each { length: 4 } as _, i}
    <label class={`grow tab ${tab == i ? 'tab-active' : ''}`}>
      <input type="radio" bind:group={tab} name="tab" value={i} class="hidden" />
      {['All', 'Blog', 'Qiita', 'Zenn'][i]}
      <div class="badge badge-sm ml-2">
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
