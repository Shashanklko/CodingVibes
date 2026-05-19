import dockerData from './docker_kubernetes_concepts.json';
import microservicesData from './microservices_concepts.json';
import springBootData from './spring_boot_concepts.json';
import javaCoreData from './java_core_concepts.json';
import hibernateData from './hibernate_concepts.json';
import cppData from './cpp_concepts.json';

import rustData from './rust_concepts.json';
import reactData from './react_concepts.json';

export const roadmaps = {
  cpp: cppData,
  rust: rustData,
  javaCore: javaCoreData,
  springBoot: springBootData,
  hibernate: hibernateData,
  docker: dockerData,
  microservices: microservicesData,
  react: reactData,
};

export type RoadmapKey = keyof typeof roadmaps;
