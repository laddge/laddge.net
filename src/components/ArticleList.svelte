<script lang="ts">
  import { format } from 'date-fns'

  import type { Article } from '@/lib/getArticles'

  export let articles: Article[]
</script>

<ul>
  {#each articles as article}
    <li class="py-4 flex items-center gap-3 break-words">
      <a
        href={article.href}
        target={article.articleType ? '_blank' : ''}
        class="btn btn-ghost h-auto border-none p-0 flex-none w-32 max-w-[30vw] aspect-[1200/630] rounded-xl bg-base-200 bg-no-repeat bg-center bg-[length:2rem_2rem] overflow-hidden"
        style="background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0xOS41IDE0LjI1di0yLjYyNWEzLjM3NSAzLjM3NSAwIDAwLTMuMzc1LTMuMzc1aC0xLjVBMS4xMjUgMS4xMjUgMCAwMTEzLjUgNy4xMjV2LTEuNWEzLjM3NSAzLjM3NSAwIDAwLTMuMzc1LTMuMzc1SDguMjVtMCAxMi43NWg3LjVtLTcuNSAzSDEyTTEwLjUgMi4yNUg1LjYyNWMtLjYyMSAwLTEuMTI1LjUwNC0xLjEyNSAxLjEyNXYxNy4yNWMwIC42MjEuNTA0IDEuMTI1IDEuMTI1IDEuMTI1aDEyLjc1Yy42MjEgMCAxLjEyNS0uNTA0IDEuMTI1LTEuMTI1VjExLjI1YTkgOSAwIDAwLTktOXoiIC8+PC9zdmc+Cg==);"
      >
        <img
          src={article.image}
          alt={article.slug}
          class="w-full h-full rounded-xl object-contain"
          loading="lazy"
        />
      </a>
      <div class="min-w-0 grow">
        <a
          href={article.href}
          target={article.articleType ? '_blank' : ''}
          class="flex max-w-fit btn btn-sm btn-ghost normal-case text-2xl text-left h-auto"
        >
          <span class="min-w-0"
            >{article.title}{#if article.articleType}<svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="-6 0 36 36"
                stroke-width="2.5"
                class="inline w-6 h-6 stroke-base-content/[.8]"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                /></svg
              >{/if}</span
          >
        </a>
        <div class="mt-0.5 px-3 flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.75"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
          {format(article.pubDate, 'yyyy.MM.dd')}
          {#if article.articleType == 1}
            <div class="px-1 flex items-center gap-1">
              <div class="w-2 h-2 flex-none rounded-full bg-[#55c500]" />
              Qiita
            </div>
          {:else if article.articleType == 2}
            <div class="px-1 flex items-center gap-1">
              <div class="w-2 h-2 flex-none rounded-full bg-[#3ea8ff]" />
              Zenn - Article
            </div>
          {:else if article.articleType == 3}
            <div class="px-1 flex items-center gap-1">
              <div class="w-2 h-2 flex-none rounded-full bg-[#3ea8ff]" />
              Zenn - Scrap
            </div>
          {/if}
        </div>
        <div class="flex flex-wrap gap-1 px-2">
          {#each article.tags as tag}
            <a
              href={`/articles?tags=${tag}`}
              class="btn btn-ghost px-1 h-auto min-h-0 normal-case text-base font-medium text-base-content/[.8] hover:underline"
            >
              #{tag}
            </a>
          {/each}
        </div>
      </div>
    </li>
  {/each}
</ul>
