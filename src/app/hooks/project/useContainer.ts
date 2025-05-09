import ContainerFactory from "@public/project/js/Container/ContainerFactory";

export const useContainer = () => {
  const container = ContainerFactory.prototype.create();
  const rootUrl = container.getDependency("rootUrl");
  const cdnUrl = container.getDependency("cdnUrl");

  return { container, rootUrl, cdnUrl };
};
