import {Server, Model, Factory} from 'miragejs';
import {nanoid} from '@reduxjs/toolkit';

export function makeServer({environment = 'development'} = {}) {
  let server = new Server({
    environment,

    models: {
      post: Model,
    },

    factories: {
      post: Factory.extend({
        id() {
          return nanoid();
        },
        title() {
          return 'Lorem Ipsum';
        },
        date() {
          return new Date().toISOString();
        },
        content() {
          return "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset s";
        },
        reactions() {
          return {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0};
        },
      }),
    },

    // eslint-disable-next-line @typescript-eslint/no-shadow
    seeds(server) {
      server.createList('post', 15);
    },

    routes() {
      this.get('/fakeApi/posts', schema => {
        return schema.all('post');
      });
      this.post('/fakeApi/posts', (schema, request) => {
        const post = JSON.parse(request.requestBody);
        return {
          post: {
            ...post,
            id: nanoid(),
            date: new Date().toISOString(),
            reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0},
          },
        };
      });
    },
  });

  return server;
}
