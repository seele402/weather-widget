import type { Weather } from "@/types/Weather";

export const getWeatherFromXML = (xml: XMLDocument): Weather => {
  return nodesToObject(xml.childNodes[0].childNodes) as Weather;
};

const getAttributesMap = (node: Element): Record<string, string> => {
  const map: Record<string, string> = {};
  for (let i = 0; i < (node.attributes?.length || 0); i++) {
    const { name, value } = node.attributes.item(i)!;
    map[name] = value;
  }

  return map;
};
const nodesToObject = (
  nodeList: NodeListOf<ChildNode>
): Record<string, unknown> => {
  const outputObject: Record<string, unknown> = {};

  for (const node of nodeList) {
    const nodeAttributes = getAttributesMap(node as Element);
    const childrenNodes = nodesToObject(node.childNodes);
    outputObject[node.nodeName] = {
      ...nodeAttributes,
      ...childrenNodes,
    };
  }

  return outputObject;
};
