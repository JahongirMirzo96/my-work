<template>
    <v-dialog v-model="dialog" width="600" persistent>
        <v-card>
            <v-toolbar dark flat dense color="#24293F">
                <v-toolbar-title class="font-weight-medium toolbar-title">
                    {{ titleDialog }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn dark icon @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-form ref="my_form" lazy-validation v-model="valid">
                <v-container fluid class="my-1 py-1 mx-0">
                    <v-row dense class="px-2 ">
                        <v-col cols="12" sm="12">
                            <v-text-field dense outlined v-model="editing_task.title" label="Title" placeholder="Title"
                                :rules="[validation.title]" />
                        </v-col>

                    </v-row>
                </v-container>
            </v-form>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" text small :disabled="!valid" @click="$refs.my_form.validate() && createOrUpdate()">
                    Save
                </v-btn>
                <v-btn color="error" text small @click="dialog = false">
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

const defaultTask = {
    id: null,
    title: "",
}

export default {
    data() {
        return {
            editing_task: { ...defaultTask },
            dialog: false,
            valid: false,
            validation: {
                title: (val) => !!val || "No title!",
            }
        }
    },
    computed: {
        titleDialog() {
            if (this.editing_task.id) return "Update"
            return "Create"
        },
    },
    methods: {

        async showDialog(task) {
            this.$refs.my_form && this.$refs.my_form.resetValidation()
            this.editing_task = { ...defaultTask, ...task }
            this.dialog = true
        },

        async createOrUpdate() {
            if (this.editing_task.id) {
                await this.updateTask()
            } else {
                await this.createTask()
            }
        },
        async updateTask() {
            try {
                this.$store.commit("tasks/SET_LOADING", true)
                await this.$store.dispatch("tasks/updateTask", this.editing_task)
                this.$toast.success('Updated!')
                this.dialog = false
            } catch (error) {
                this.$toast.error('Error!')
            } finally {
                this.$store.commit("tasks/SET_LOADING", false)
            }
        },
        async createTask() {
            try {
                this.$store.commit("tasks/SET_LOADING", true)
                await this.$store.dispatch("tasks/createTask", this.editing_task)
                this.$toast.success('Created!')
                this.dialog = false
            } catch (error) {
                this.$toast.error('Error!')
            } finally {
                this.$store.commit("tasks/SET_LOADING", false)
            }
        },
    }
}
</script>