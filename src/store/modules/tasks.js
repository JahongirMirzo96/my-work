import http from "@/axios";

const state = () => ({
  tasks_data: {
    data: [
      {
        id: 1,
        title: "Go settings",
      },
      {
        id: 2,
        title: "Go play",
      },
    ],
    meta: {
      last_page: 1,
    },
    links: [],
  },
  params: {},
  loading_data: false,
});

const getters = {
  getTasks: (state) => state.tasks_data,
  getTotalTasks: (state) => state.tasks_data.meta.last_page,
  getLoading: state => state.loading_data
};

const mutations = {
  SET_TASKS_DATA: (state, { tasks_data, params }) => {
    state.tasks_data = tasks_data;
    state.params = params;
  },
  SET_LOADING: (state, loading_value) => {
    state.loading_data = loading_value
  }
};

const actions = {
  async fetchTasks({ commit, state }, params) {
    try {
      const { data: tasks_data } = await http.get("/url", {
        params: {
          ...state.params,
          ...params,
        },
      });
      commit("SET_TASKS_DATA", { tasks_data, params });
      return Promise.resolve(tasks_data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async createTask(ctx, body) {
    try {
      const response = await http.post("/url", body);
      await fetchTasks(state.params);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateTask(ctx, body) {
    try {
      const response = await http.put(`/url/${body.id}`, body);
      await fetchTasks(state.params);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteTask(ctx, id) {
    try {
      const response = await http.delete(`/url/${id}`);
      await fetchTasks(state.params);
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default {
  namespaced: true,
  actions,
  getters,
  state,
  mutations,
};
