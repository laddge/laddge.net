<script lang="ts">
  import { format } from 'date-fns'

  interface Article {
    slug: string
    href: string
    title: string
    tags: string[]
    pubDate: Date
    image: string
  }

  export let articles: Article[]
</script>

<ul>
  {#each articles as article}
    <li class="my-2 py-2 flex items-center gap-3 break-words">
      <div
        class="flex-none w-20 h-20 rounded-box bg-primary/50 bg-no-repeat bg-center bg-[length:2rem_2rem] overflow-hidden"
        style="background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iY3VycmVudENvbG9yIj48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0xOS41IDE0LjI1di0yLjYyNWEzLjM3NSAzLjM3NSAwIDAwLTMuMzc1LTMuMzc1aC0xLjVBMS4xMjUgMS4xMjUgMCAwMTEzLjUgNy4xMjV2LTEuNWEzLjM3NSAzLjM3NSAwIDAwLTMuMzc1LTMuMzc1SDguMjVtMCAxMi43NWg3LjVtLTcuNSAzSDEyTTEwLjUgMi4yNUg1LjYyNWMtLjYyMSAwLTEuMTI1LjUwNC0xLjEyNSAxLjEyNXYxNy4yNWMwIC42MjEuNTA0IDEuMTI1IDEuMTI1IDEuMTI1aDEyLjc1Yy42MjEgMCAxLjEyNS0uNTA0IDEuMTI1LTEuMTI1VjExLjI1YTkgOSAwIDAwLTktOXoiIC8+PC9zdmc+Cg==);"
      >
        <div
          class="w-full h-full bg-no-repeat bg-center bg-cover"
          style={`background-image: url(${article.image});`}
        />
      </div>
      <div class="min-w-0 grow">
        <a
          href={article.href}
          class="flex max-w-fit btn btn-sm btn-ghost normal-case text-2xl text-left h-auto"
        >
          <span class="min-w-0">{article.title}</span>
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
        </div>
        <div class="flex flex-wrap gap-1 px-2">
          {#each article.tags as tag}
            <a
              href={`/tags/${tag}`}
              class="btn btn-ghost px-1 h-auto min-h-0 normal-case text-base font-normal text-neutral/75"
            >
              #{tag}
            </a>
          {/each}
        </div>
      </div>
    </li>
  {/each}
</ul>
