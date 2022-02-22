import { Video } from "../entities/Video";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { UserVideo } from "../entities/UserVideo";
import { MyContext } from "src/types";

@Resolver(Video)
export default class VideoResolver {
  @Query(() => [Video])
  async videos(): Promise<Video[]> {
    return Video.find();
  }

  // Returns all users who have watched a given video
  @Query(() => [User])
  async videoViewers(
    @Arg("videoId", () => Int) videoId: number
  ): Promise<Promise<User>[]> {
    const video = Video.findOne(videoId);
    if (!video) throw new Error("Video not found");

    const userVideos = await UserVideo.find({ videoId: videoId });
    return userVideos.map((uv) => uv.user);
  }

  // Returns all videos watched by the current user
  @Query(() => [Video])
  async userWatchedVideos(
    @Ctx() { req }: MyContext
  ): Promise<Promise<Video>[]> {
    const userId = req.session.userId;
    if (!userId) throw new Error("User not logged in");
    const user = await User.findOne(userId);
    if (!user) throw new Error("User not found");

    const userVideos = await UserVideo.find({ userId: parseInt(userId) });
    return userVideos.map((uv) => uv.video);
  }

  // Returns all videos the user has not yet watched
  @Query(() => [Video])
  async userUnwatchedVideos(@Ctx() { req }: MyContext) {
    const userId = req.session.userId;
    if (!userId) throw new Error("User not logged in");
    const user = await User.findOne(userId);
    if (!user) throw new Error("User not found");

    const videos = await Video.find();
    console.log(
      await UserVideo.findAndCount({
        userId: parseInt(userId),
        videoId: 1,
      })
    );
    const unwatchedVideos = [];
    for (const video of videos) {
      const userVideo = await UserVideo.findOne({
        userId: parseInt(userId),
        videoId: video.id,
      });
      if (userVideo == null) {
        unwatchedVideos.push(video);
      }
    }
    return unwatchedVideos;
  }

  // Creates new video in database
  @Mutation(() => Video)
  async addVideo(
    @Arg("title", () => String) title: string,
    @Arg("videoUrl", () => String) videoUrl: string,
    @Arg("tokens", () => Int) tokens: number
  ): Promise<Video> {
    return await Video.create({
      title: title,
      videoUrl: videoUrl,
      tokens: tokens,
    }).save();
  }

  // Removes video from database
  @Mutation(() => Boolean)
  async removeVideo(@Arg("id", () => Int) id: number): Promise<boolean> {
    const video = await Video.findOne({ id: id });
    if (!video) return false;

    await video!.remove();
    return true;
  }

  // Marks a video as watched by the current user
  @Mutation(() => UserVideo)
  async watchVideo(
    @Arg("videoId", () => Int) videoId: number,
    @Ctx() { req }: MyContext
  ) {
    const userId = req.session.userId;
    if (!userId) throw new Error("User not logged in");
    const user = await User.findOne(userId);
    if (!user) throw new Error("User not found");

    const video = await Video.findOne({ id: videoId });
    if (!video) throw new Error("Video not found");

    return await UserVideo.create({
      userId: parseInt(userId),
      videoId: videoId,
    }).save();
  }
}
