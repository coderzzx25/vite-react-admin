import { MenuItem } from '@/types/systems/menu';
import { IMenu } from '@/types/systems/menu';
import * as Icons from '@ant-design/icons';
import { createElement } from 'react';

/**
 * @description 处理icon
 * @param {string} icon icon
 * return {reactNode} 处理后的icon
 */
const customIcons: { [key: string]: any } = Icons;
const mapIcon = (icon: string) => {
  return createElement(customIcons[icon]);
};

/**
 * @description 处理菜单数据
 * @param {IMenu[]} menus 菜单数据
 * return {MenuItem[]} 处理后的菜单数据
 */
export const mapMenuToMenuItem = (menus: IMenu[]): MenuItem[] => {
  return menus.map((item) => {
    if (item.children) {
      return {
        key: item.menuUrl,
        label: item.menuName,
        icon: mapIcon(item.menuIcon),
        children: mapMenuToMenuItem(item.children)
      };
    } else {
      return {
        key: item.menuUrl,
        label: item.menuName,
        icon: mapIcon(item.menuIcon)
      };
    }
  });
};

/**
 * @description 处理菜单一维数组
 * @param {IMenu[]} menus 菜单数据
 * return {string[]} 处理后的菜单一维数组
 */
export const mapMenuToUrl = (menus: IMenu[]): string[] => {
  if (!Array.isArray(menus)) return [];
  return menus.reduce((prev: string[], current: IMenu) => {
    if (current.children) {
      return prev.concat(...mapMenuToUrl(current.children));
    }
    return prev.concat(current.menuUrl);
  }, []);
};

/**
 * @description 根据子菜单的url获取父菜单的url
 * @param {IMenu[]} menus 菜单数据
 * @param {string} url 子菜单的url
 * return {string} 父菜单的url
 */
export const getParentMenuUrl = (menus: IMenu[], url: string): string => {
  let parentUrl = '';
  menus.forEach((item) => {
    if (item.children) {
      const childUrl = getParentMenuUrl(item.children, url);
      if (childUrl) {
        parentUrl = item.menuUrl;
      }
    } else {
      if (item.menuUrl === url) {
        parentUrl = item.menuUrl;
      }
    }
  });
  return parentUrl;
};

export const searchRouter = (url: string, menus: IMenu[]): IMenu | null => {
  if (!Array.isArray(menus)) return null;
  for (const item of menus) {
    if (item.menuUrl === url) return item;
    if (item.children?.length) {
      const result = searchRouter(url, item.children);
      if (result) return result;
    }
  }
  return null;
};
