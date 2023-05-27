<script lang="ts">
  import axios from 'axios'
  import { onMount } from 'svelte'

  const ghToken = atob('Z2hwXzZQdU9DRnZ4TkFEdXZPYzFSSlNMdHhJMHhwT0FjazFBaDJPZAo=')
  let displayEl: HTMLElement
  $: {
    if (displayEl) {
      displayEl.scrollLeft = displayEl.scrollWidth
    }
  }
  let levels: number[] = []
  let total: number

  onMount(() => {
    axios({
      url: 'https://api.github.com/graphql',
      method: 'POST',
      data: {
        query:
          'query{user(login:"laddge"){contributionsCollection{contributionCalendar{totalContributions,weeks{contributionDays{contributionLevel}}}}}}',
      },
      headers: { Authorization: `bearer ${ghToken}` },
    })
      .then((res) => {
        for (const week of res.data.data.user.contributionsCollection.contributionCalendar.weeks) {
          for (const day of week.contributionDays) {
            levels[levels.length] = [
              'NONE',
              'FIRST_QUARTILE',
              'SECOND_QUARTILE',
              'THIRD_QUARTILE',
              'FOURTH_QUARTILE',
            ].indexOf(day.contributionLevel)
          }
        }
        total = res.data.data.user.contributionsCollection.contributionCalendar.totalContributions
      })
      .catch((e) => {
        console.log(e)
      })
  })
</script>

<div class="flex flex-wrap justify-center items-center h-[11rem]">
  {#if levels.length}
    <div
      bind:this={displayEl}
      class="grid grid-rows-[repeat(7,_minmax(0,_1fr))] grid-flow-col gap-2 justify-start w-full overflow-auto py-2"
    >
      {#each levels as level}
        <div
          class="w-3 h-3 bg-primary rounded-sm"
          style={`filter: brightness(${(level + 1) / 5});`}
        />
      {/each}
    </div>
    <div class="flex gap-6 w-full">
      <div class="grow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="inline w-4 h-4 mr-1"><path d="M1 2.5A2.5 2.5 0 0 1 3.5 0h8.75a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V1.5h-8a1 1 0 0 0-1 1v6.708A2.493 2.493 0 0 1 3.5 9h3.25a.75.75 0 0 1 0 1.5H3.5a1 1 0 0 0 0 2h5.75a.75.75 0 0 1 0 1.5H3.5A2.5 2.5 0 0 1 1 11.5Zm13.23 7.79h-.001l-1.224-1.224v6.184a.75.75 0 0 1-1.5 0V9.066L10.28 10.29a.75.75 0 0 1-1.06-1.061l2.505-2.504a.75.75 0 0 1 1.06 0L15.29 9.23a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018Z"></path></svg>{total.toLocaleString()} <span class="hidden md:inline">contriburions in the last year</span>
      </div>
      <div class="flex-none flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          class="w-3 h-3"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
        </svg>
        {#each Array(5) as _, level}
          <div
            class="w-3 h-3 bg-primary rounded-sm"
            style={`filter: brightness(${(level + 1) / 5});`}
          />
        {/each}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          class="w-3 h-3"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
    </div>
  {:else}
    <div role="status">
      <svg
        aria-hidden="true"
        class="inline w-8 h-8 mr-2 text-primary/50 animate-spin fill-primary"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  {/if}
</div>
