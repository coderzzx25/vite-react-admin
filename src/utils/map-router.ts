import { createElement } from 'react';
import { IPermissionInfo } from '@/types/systems/permission';
import { MenuProps } from 'antd';
import * as Icons from '@ant-design/icons';
import { IOptions } from '@/components/BaseForm/type';

/**
 * @description 处理icon
 * @param {string} icon icon
 * return {reactNode} 处理后的icon
 */
const customIcons: { [key: string]: any } = Icons;
export const mapIcon = (icon: string) => {
  if (!icon) return '';
  return createElement(customIcons[icon]);
};

/**
 * @description 处理权限数据
 * @param {IPermissionInfo[]} permissions 权限数据
 * return {Required<MenuProps>['items'][number][]} 处理后的权限数据
 */
export const mapPermissionToMenuItem = (permissions: IPermissionInfo[]): Required<MenuProps>['items'][number][] => {
  return permissions.map((item) => {
    if (item.children) {
      return {
        key: item.permissionUrl,
        label: item.permissionName,
        icon: mapIcon(item.permissionIcon),
        children: mapPermissionToMenuItem(item.children)
      };
    } else {
      return {
        key: item.permissionUrl,
        label: item.permissionName,
        icon: mapIcon(item.permissionIcon)
      };
    }
  });
};

/**
 * @description 处理权限一维数组
 * @param {IPermissionInfo[]} permissions 权限数据
 * return {string[]} 处理后的权限一维数组
 */
export const mapPermissionToUrl = (permissions: IPermissionInfo[]): string[] => {
  if (!Array.isArray(permissions)) return [];
  return permissions.reduce((prev: string[], current: IPermissionInfo) => {
    if (current.children) {
      return prev.concat(...mapPermissionToUrl(current.children));
    }
    return prev.concat(current.permissionUrl);
  }, []);
};

/**
 * @description 根据子权限的url获取父权限的url
 * @param {IMenu[]} permissions 权限数据
 * @param {string} url 子权限的url
 * return {string} 父权限的url
 */
export const getParentMenuUrl = (permissions: IPermissionInfo[], url: string): string => {
  let parentUrl = '';
  permissions.forEach((item) => {
    if (item.children) {
      const childUrl = getParentMenuUrl(item.children, url);
      if (childUrl) {
        parentUrl = item.permissionUrl;
      }
    } else {
      if (item.permissionUrl === url) {
        parentUrl = item.permissionUrl;
      }
    }
  });
  return parentUrl;
};

export const searchRouter = (url: string, permissions: IPermissionInfo[]): IPermissionInfo | null => {
  if (!Array.isArray(permissions)) return null;
  for (const item of permissions) {
    if (item.permissionUrl === url) return item;
    if (item.children?.length) {
      const result = searchRouter(url, item.children);
      if (result) return result;
    }
  }
  return null;
};

/**
 * 处理选择器数据格式
 * @param {Array<object>} data 需要转换的数据
 * @param {string} valueKey - 用于提取值的键
 * @param {string} labelKey - 用于提取标签的键
 * @param {string} [childrenKey='children'] - 用于提取子级的键（默认为 'children'）
 * @returns {Array<IOptions>} 转换后的数据
 */
export const handleSelectData = (
  data: Array<Record<string, any>>,
  valueKey: string,
  labelKey: string,
  childrenKey: string = 'children' // Default to 'children' if not provided
): IOptions[] => {
  const transformData = (items: Array<Record<string, any>>): IOptions[] => {
    return items.map((item) => ({
      label: item[labelKey],
      value: item[valueKey],
      children: item[childrenKey] ? transformData(item[childrenKey]) : undefined
    }));
  };

  return transformData(data);
};
