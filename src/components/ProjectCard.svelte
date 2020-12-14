<script lang="ts">
    import type { KarbanProjects } from "../types";
    export let project: KarbanProjects;
</script>

<li>
    <a
        href="item.url"
        class="hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200">
        <dl
            class="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
            <div>
                <dt class="sr-only">Title</dt>
                <dd
                    class="group-hover:text-white leading-6 font-medium text-black">
                    {project.projectName}
                </dd>
            </div>
            <div>
                <dt class="sr-only">Category</dt>
                <dd
                    class="group-hover:text-light-blue-200 text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4">
                    {project.projectDescription.substr(0, 25)}...
                </dd>
            </div>
        </dl>
    </a>
</li>
