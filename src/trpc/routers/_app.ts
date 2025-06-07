import { usersRouter } from '../../../public/modules/users/server/procedures';
import { studioRouter } from '../../../public/modules/studio/server/procedures';
import { videosRouter } from '@/scripts/videos/server/procedures';
import { searchRouter } from '../../../public/modules/search/server/procedures';
import { commentsRouter } from '../../../public/modules/comments/server/procedures';
import { playlistsRouter } from '../../../public/modules/playlists/server/procedures';
import { categoriesRouter } from '../../../public/modules/categories/server/procedures';
import { videoViewsRouter } from '../../../public/modules/video-views/server/procedures';
import { suggestionsRouter } from '../../../public/modules/suggestions/server/procedures';
import { subscriptionsRouter } from '../../../public/modules/subscriptions/server/procedures';
import { videoReactionsRouter } from '@/modules/video-reactions/server/procedures';
import { commentReactionsRouter } from '../../../public/modules/comment-reactions/server/procedures';

import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
  users: usersRouter,
  studio: studioRouter,
  videos: videosRouter,
  search: searchRouter,
  comments: commentsRouter,
  playlists: playlistsRouter,
  categories: categoriesRouter,
  videoViews: videoViewsRouter,
  suggestions: suggestionsRouter,
  subscriptions: subscriptionsRouter,
  videoReactions: videoReactionsRouter,
  commentReactions: commentReactionsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
