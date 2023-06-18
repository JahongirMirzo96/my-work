<template>
    <div>
        <v-navigation-drawer style="background-color: #24293F; z-index: 100;" v-model="drawer" app>
            <div slot="prepend">
                <div>
                    <v-card-actions class="pb-0 pa-0 px-2">
                        <v-btn icon plain dark>
                            <v-icon dense>mdi-account-edit</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn @click="drawer = false" icon plain dark>
                            <v-icon dense>mdi-arrow-left-bottom</v-icon>
                        </v-btn>

                    </v-card-actions>
                </div>
                <div class="text-center">
                    <v-avatar style="border: 2px solid #7CA6D2;" size="96">
                        <v-avatar color="#3C4264" size="80">
                            <span style="font-size: 14px;" class="font-weight-bold white--text">Tasks</span>
                        </v-avatar>
                    </v-avatar>
                </div>
                <div class="text-center">
                    <v-card-text class="font-weight-bold white--text">Xursanov Jahongir</v-card-text>
                </div>
                <v-divider style="background-color: #363d5b;" />
            </div>
            <div>
                <v-list dark dense>
                    <v-list-group color="#58BDFF" v-model="item.active" v-for="item in filterItems" :key="item.title"
                        no-action>
                        <template v-slot:activator>
                            <v-list-item-icon>
                                <v-icon v-text="item.action" dense></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}
                                </v-list-item-title>
                            </v-list-item-content>
                            <!-- <v-list-item-content>
                                <v-badge v-if="item.title === 'Товарлар' && notifications && notifications.product > 0"
                                    style="position: absolute; right: -5px; top: 7px" color="#00E396"
                                    dot></v-badge></span></v-list-item-title>
                            </v-list-item-content> -->
                        </template>
                        <v-list-item v-for="child in item.items" :key="child.title" :to="child.to" color="white    " dense>
                            <v-list-item-content>
                                <v-list-item-title><span style="position: relative">{{ child.title
                                }}</span></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list>
            </div>
            <div slot="append">
                <v-divider style="background-color: #363d5b;" />
                <v-list dark dense>
                    <v-list-item dense>
                        <v-list-item-content>
                            <v-btn class="text-none" rounded small plain>Чиқиш</v-btn>
                        </v-list-item-content>
                        <v-spacer />
                        <v-list-item-content>
                            <v-badge :value="3" color="error" offset-x="20" offset-y="10" bordered overlap dot>
                                <v-btn class="text-none" rounded small plain>
                                    1.0
                                </v-btn>
                            </v-badge>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </div>
        </v-navigation-drawer>
        <v-app-bar v-if="!drawer" app height="30" dense color="#24293F">
            <v-btn @click.stop="drawer = !drawer" icon plain dark>
                <v-icon size="20">mdi-menu</v-icon>
            </v-btn>
            <span class="font-weight-bold white--text">Tasks</span>
            <v-spacer />
            <span v-if="!drawer" class="font-weight-bold white--text app-bar__text">Xursanov Jahongir</span>
        </v-app-bar>
        <v-main>
            <router-view />
        </v-main>
    </div>
</template>
<script>
export default {
    data() {
        return {
            drawer: true,
            filterItems: [
                {
                    action: 'mdi-home',
                    title: 'Home',
                    active: true,
                    items: [
                        { title: "Home", to: "/", },
                        { title: "Tasks", to: "/tasks", },
                    ]
                },
            ]
        }
    }
}

</script>