<template>
    <div>
        <v-card style="box-shadow: 0 4px 4px 1px #EEEEEE;" class="px-2" tile>
            <v-card-actions>
                <span style="color: #545B76;" class="title">Tasks</span>
                <v-spacer></v-spacer>
                <v-btn class="mx-2" color="success" @click="openCreateOrUpdateDialog">
                    <v-icon small class="mx-2">mdi-plus-circle</v-icon>
                    <span>Create</span>
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-row dense align="center" justify="center">
            <v-col cols="12" sm="12">
                <v-data-table style="border-radius: 0" class="elevation-1 ma-2 pa-3" dense :loading="loading_data"
                    :headers="headers" :server-items-length="total_tasks_data" :options.sync="options"
                    :items="tasks_data.data" disable-pagination hide-default-footer>
                    <template #no-data>
                        <span>No data!!!</span>
                    </template>
                    <template #item.actions="{ item }">
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn @click="openCreateOrUpdateDialog(item)" icon v-bind="attrs" v-on="on"
                                    color="success">
                                    <v-icon small color="#4CAF50">mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                            <span>Edit</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn @click="deleteTask(item)" icon v-bind="attrs" v-on="on" color="success">
                                    <v-icon small color="error">mdi-delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Delete</span>
                        </v-tooltip>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>

        <v-footer inset app class="py-4">
            <v-row align="center" justify="center">
                <v-pagination v-if="!loading_data" v-model="options.page" :length="total_tasks_data" :total-visible="7"
                    color="success" />
            </v-row>
        </v-footer>
        <CreateOrUpdate ref="create_or_update" />
    </div>
</template>

<script>
import CreateOrUpdate from '@/components/tasks/create-or-update'
import { mapGetters } from 'vuex';

export default {
    components: { CreateOrUpdate },
    data() {
        return {

            options: {
                page: 1
            },
            headers: [
                {
                    text: "ID",
                    divider: true,
                    value: "id",
                    class: "blue-grey lighten-2 white--text",
                },
                {
                    text: "Task name",
                    divider: true,
                    value: "title",
                    class: "blue-grey lighten-2 white--text",
                },
                {
                    text: "Actions",
                    divider: true,
                    value: "actions",
                    class: "blue-grey lighten-2 white--text",
                },
            ],
        };
    },
    watch: {
        "options.page": "init"
    },
    computed: {
        ...mapGetters({
            tasks_data: "tasks/getTasks",
            total_tasks_data: "tasks/getTotalTasks",
            loading_data: "tasks/getLoading"
        })
    },
    // async created() {
    //     await this.init()
    // },
    methods: {
        async init() {
            try {
                this.$store.commit("tasks/SET_LOADING", true)
                await this.$store.dispatch("tasks/fetchTasksData", {
                    page: this.options.page
                })
            } catch {
                this.$toast.error(
                    Object.values(error.response && error.response.data.message)[0][0] || "Error!"
                )
            } finally {
                this.$store.commit("tasks/SET_LOADING", false)
            }
        },
        openCreateOrUpdateDialog(task = null) {
            this.$refs.create_or_update.showDialog(task)
        },

        async deleteTask(task) {
            try {
                this.$store.commit("tasks/SET_LOADING", true)
                await this.$store.dispatch("tasks/deleteTask", task.id)
                this.$toast.success('Deleted!')
            } catch (error) {
                this.$toast.error('Error!')
            } finally {
                this.$store.commit("tasks/SET_LOADING", false)
            }
        }
    }
};
</script>