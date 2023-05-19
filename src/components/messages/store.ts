interface State {
  idConv: number;
  showWelcome: boolean;
}

const state: State = {
  idConv: 1,
  showWelcome: true
};

type Mutation = (state: State, payload: any) => void;

interface Mutations {
  [key: string]: Mutation;
}

const mutations: Mutations = {
  updateIdConv(state, conversationId) {
    state.idConv = conversationId;
  },
  updateshowWelcome(state, showWelcome) {
    state.showWelcome = showWelcome;
  },
};

const store = {
  state,
  mutations,
};

export default store;