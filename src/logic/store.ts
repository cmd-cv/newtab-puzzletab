import { useToggle } from '@vueuse/core'
import pkg from '../../package.json'
import { isNotChrome } from '@/env'
import { useStorageLocal } from '@/composables/useStorageLocal'
import { styleConst } from '@/styles/index'
import { DAYJS_LANG_MAP, FONT_LIST, toggleIsDragMode, moveState, updateSetting, log } from '@/logic'

export const [isSettingDrawerVisible, toggleIsSettingDrawerVisible] = useToggle(false)

export const defaultState = {
  common: {
    syncTime: 0,
    currAppearanceCode: 0, // 0:light | 1:dark
    availableFontList: [] as any[],
  },
  style: {
    general: {
      layout: {
        xOffsetKey: 'right',
        xOffsetValue: 1,
        xTranslateValue: 0,
        yOffsetKey: 'top',
        yOffsetValue: 50,
        yTranslateValue: -50,
      },
      fontFamily: 'Arial',
      fontSize: 14,
      fontColor: ['rgba(44, 62, 80, 1)', 'rgba(255, 255, 255, 1)'],
      backgroundColor: ['rgba(255, 255, 255, 1)', 'rgba(53, 54, 58, 1)'],
      bgOpacity: 0.7,
      bgBlur: 10,
    },
    settingIcon: {
      layout: {
        xOffsetKey: 'right',
        xOffsetValue: 1,
        xTranslateValue: 0,
        yOffsetKey: 'top',
        yOffsetValue: 50,
        yTranslateValue: -50,
      },
    },
    bookmark: {
      layout: {
        xOffsetKey: 'left',
        xOffsetValue: 50,
        xTranslateValue: -50,
        yOffsetKey: 'top',
        yOffsetValue: 1,
        yTranslateValue: 0,
      },
      margin: 3,
      width: 50,
      fontFamily: 'Arial',
      fontSize: 12,
      fontColor: ['rgba(15, 23, 42, 1)', 'rgba(15, 23, 42, 1)'],
      backgroundColor: ['rgba(209, 213, 219, 1)', 'rgba(212, 212, 216, 1)'],
      activeColor: ['rgba(255, 255, 255, 1)', 'rgba(71,85,105, 1)'],
      isBorderEnabled: true,
      borderWidth: 1,
      borderColor: ['rgba(71,85,105, 1)', 'rgba(71,85,105, 1)'],
      isShadowEnabled: true,
      shadowColor: ['rgba(44, 62, 80, 0.1)', 'rgba(0, 0, 0, 0.15)'],
    },
    clockDigital: {
      layout: {
        xOffsetKey: 'left',
        xOffsetValue: 50,
        xTranslateValue: -50,
        yOffsetKey: 'top',
        yOffsetValue: 50,
        yTranslateValue: -50,
      },
      fontFamily: 'Arial Rounded MT Bold',
      fontSize: 80,
      letterSpacing: 2,
      fontColor: ['rgba(44, 62, 80, 1)', 'rgba(228, 228, 231, 1)'],
      isShadowEnabled: true,
      shadowColor: ['rgba(181, 181, 181, 1)', 'rgba(33, 33, 33, 1)'],
      unit: {
        fontSize: 30,
      },
    },
    clockAnalog: {
      layout: {
        xOffsetKey: 'left',
        xOffsetValue: 50,
        xTranslateValue: -50,
        yOffsetKey: 'top',
        yOffsetValue: 25,
        yTranslateValue: 0,
      },
      width: 150,
    },
    date: {
      layout: {
        xOffsetKey: 'left',
        xOffsetValue: 50,
        xTranslateValue: -50,
        yOffsetKey: 'top',
        yOffsetValue: 58,
        yTranslateValue: 0,
      },
      fontFamily: 'Arial Rounded MT Bold',
      fontSize: 24,
      fontColor: ['rgba(44, 62, 80, 1)', 'rgba(228, 228, 231, 1)'],
      isShadowEnabled: true,
      shadowColor: ['rgba(181, 181, 181, 1)', 'rgba(33, 33, 33, 1)'],
    },
    calendar: {
      layout: {
        xOffsetKey: 'left',
        xOffsetValue: 0,
        xTranslateValue: 0,
        yOffsetKey: 'bottom',
        yOffsetValue: 0,
        yTranslateValue: 0,
      },
      width: 45,
      fontFamily: 'Arial',
      fontSize: 14,
      fontColor: ['rgba(44, 62, 80, 1)', 'rgba(255, 255, 255, 1)'],
      backgroundColor: ['rgba(209, 213, 219, 0.75)', 'rgba(58, 58, 58, 0.75)'],
      activeColor: ['rgba(209, 213, 219, 1)', 'rgba(113, 113, 113, 1)'],
      isBorderEnabled: true,
      borderWidth: 1,
      borderColor: ['rgba(71,85,105, 1)', 'rgba(82, 82, 82, 1)'],
      isShadowEnabled: true,
      shadowColor: ['rgba(14, 30, 37, 0.12)', 'rgba(14, 30, 37, 0.12)'],
    },
    search: {
      layout: {
        xOffsetKey: 'left',
        xOffsetValue: 50,
        xTranslateValue: -50,
        yOffsetKey: 'bottom',
        yOffsetValue: 30,
        yTranslateValue: 0,
      },
      width: 330,
      fontFamily: 'Arial',
      fontSize: 18,
      fontColor: ['rgba(44, 62, 80, 1)', 'rgba(228, 228, 231, 1)'],
      isBorderEnabled: true,
      borderWidth: 1,
      borderColor: ['rgba(167, 176, 188, 1)', 'rgba(167, 176, 188, 1)'],
      backgroundColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
      isShadowEnabled: true,
      shadowColor: ['rgba(31, 31, 31, 0.5)', 'rgba(31, 31, 31, 0.5)'],
    },
    weather: {
      layout: {
        xOffsetKey: 'left',
        xOffsetValue: 50,
        xTranslateValue: -50,
        yOffsetKey: 'bottom',
        yOffsetValue: 0,
        yTranslateValue: 0,
      },
      fontFamily: 'Arial Rounded MT Bold',
      fontSize: 14,
      fontColor: ['rgba(44, 62, 80, 1)', 'rgba(255, 255, 255, 1)'],
      iconSize: 50,
    },
    memo: {
      layout: {
        xOffsetKey: 'right',
        xOffsetValue: 20,
        xTranslateValue: 0,
        yOffsetKey: 'top',
        yOffsetValue: 20,
        yTranslateValue: 0,
      },
      width: 200,
      height: 200,
      fontFamily: 'Arial',
      fontSize: 14,
      fontColor: ['rgba(44, 62, 80, 1)', 'rgba(228, 228, 231, 1)'],
      backgroundColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
      isShadowEnabled: true,
      shadowColor: ['rgba(31, 31, 31, 0.5)', 'rgba(31, 31, 31, 0.5)'],
    },
  },
  setting: {
    general: {
      version: pkg.version,
      appearance: 'auto', // light | dark | auto
      pageTitle: 'NewTab',
      lang: chrome.i18n.getUILanguage() || 'en-US',
      drawerPlacement: 'right' as any,
      isBackgroundImageEnabled: true,
      backgroundImageSource: 1, // 0:localFile, 1:network
      backgroundImageId: '/th?id=OHR.Oymyakon_ZH-CN7758768574', // images[0].urlbase e.g.: '/th?id=OHR.SnowyPrague_ZH-CN9794475183'
      backgroundImageUrl: 'http://cn.bing.com//th?id=OHR.Oymyakon_ZH-CN7758768574_UHD.jpg',
      backgroundImageDesc: '奥伊米亚康的冬天，俄罗斯 (© Alexandr Berdicevschi/Getty Images)',
      favoriteBackgroundList: [
        {
          id: '/th?id=OHR.Oymyakon_ZH-CN7758768574',
          url: 'http://cn.bing.com//th?id=OHR.Oymyakon_ZH-CN7758768574_UHD.jpg',
          desc: '奥伊米亚康的冬天，俄罗斯 (© Alexandr Berdicevschi/Getty Images)',
        },
      ],
    },
    settingIcon: {
      enabled: false,
    },
    bookmark: {
      enabled: false,
      isSymbolEnabled: true,
      isNumberEnabled: false,
      isDblclickOpen: true,
      dblclickIntervalTime: 200, // ms
      keymap: {},
    },
    clockDigital: {
      enabled: true,
      format: 'hh:mm:ss',
      unitEnabled: true,
    },
    clockAnalog: {
      enabled: false,
      theme: 0, // themeList的索引
    },
    date: {
      enabled: false,
      format: 'YYYY-MM-DD dddd',
    },
    calendar: {
      enabled: false,
    },
    search: {
      enabled: true,
      iconEnabled: true,
      suggestionEnabled: true,
      placeholder: 'baidu',
      urlName: 'baidu',
      urlValue: 'https://www.baidu.com/s?word={query}',
    },
    weather: {
      enabled: false,
      apiKey: '72db57326f9f494ab04d1d431bc127e9',
      city: {
        id: '101010300', // 101010300
        name: '中国-北京市-北京-朝阳', // "中国-北京市-北京-朝阳"
      },
      temperatureUnit: 'c', // 'c' | 'f'
      speedUnit: 'kph', // 'kph' | 'mph'
      iconEnabled: true,
      forecastEnabled: false,
    },
    memo: {
      enabled: false,
      countEnabled: true,
      content: '',
    },
  },
}

export const localState = reactive({
  common: useStorageLocal('local-state', defaultState.common),
  style: {
    general: useStorageLocal('style-general', defaultState.style.general),
    settingIcon: useStorageLocal('style-setting-icon', defaultState.style.settingIcon),
    bookmark: useStorageLocal('style-bookmark', defaultState.style.bookmark),
    clockDigital: useStorageLocal('style-clock-digital', defaultState.style.clockDigital),
    clockAnalog: useStorageLocal('style-clock-analog', defaultState.style.clockAnalog),
    date: useStorageLocal('style-date', defaultState.style.date),
    calendar: useStorageLocal('style-calendar', defaultState.style.calendar),
    search: useStorageLocal('style-search', defaultState.style.search),
    weather: useStorageLocal('style-weather', defaultState.style.weather),
    memo: useStorageLocal('style-memo', defaultState.style.memo),
  },
  setting: {
    general: useStorageLocal('setting-general', defaultState.setting.general),
    settingIcon: useStorageLocal('setting-icon', defaultState.setting.settingIcon),
    bookmark: useStorageLocal('setting-bookmark', defaultState.setting.bookmark),
    clockDigital: useStorageLocal('setting-clock-digital', defaultState.setting.clockDigital),
    clockAnalog: useStorageLocal('setting-clock-analog', defaultState.setting.clockAnalog),
    date: useStorageLocal('setting-date', defaultState.setting.date),
    calendar: useStorageLocal('setting-calendar', defaultState.setting.calendar),
    search: useStorageLocal('setting-search', defaultState.setting.search),
    weather: useStorageLocal('setting-weather', defaultState.setting.weather),
    memo: useStorageLocal('setting-memo', defaultState.setting.memo),
  },
})

export const globalState = ref({
  isUploadSettingLoading: false,
  isImportSettingLoading: false,
  isClearStorageLoading: false,
  isHelpModalVisible: false,
  isWhatsNewModalVisible: false,
  isWhatsNewModalCloseToRefresh: false,
  isSearchFocused: false,
  isMemoFocused: false,
  currSettingTabValue: 'general',
})

export const currDayjsLang = computed(() => DAYJS_LANG_MAP[localState.setting.general.lang] || 'en')

export const initAvailableFontList = async() => {
  const fontCheck = new Set(FONT_LIST.sort())
  await document.fonts.ready
  const availableList = new Set()
  for (const font of fontCheck.values()) {
    if (document.fonts.check(`12px "${font}"`)) {
      availableList.add(font)
    }
  }
  localState.common.availableFontList = [...availableList.values()]
}

export const isFirstOpen = ref(useStorageLocal('data-first', true))

export const initFirstOpen = () => {
  if (!isFirstOpen.value) {
    return
  }
  // 首次打开扩展时，打开画布模式 & 帮助弹窗
  toggleIsDragMode(true)
  isFirstOpen.value = false
}

export const openWhatsNewModal = (closeToRefresh = false) => {
  globalState.value.isWhatsNewModalVisible = true
  globalState.value.isWhatsNewModalCloseToRefresh = closeToRefresh
}
export const closeWhatsNewModal = () => {
  globalState.value.isWhatsNewModalVisible = false
  globalState.value.isWhatsNewModalCloseToRefresh = false
}

export const openHelpModal = () => {
  globalState.value.isHelpModalVisible = true
}

export const checkUpdate = () => {
  const currSettingVersion = +localState.setting.general.version.split('.').join('')
  const currPkgVersion = +pkg.version.split('.').join('')
  if (currSettingVersion >= currPkgVersion) {
    return
  }
  log('checkUpdate get new version')
  localState.setting.general.version = pkg.version
  openWhatsNewModal(true) // 展示更新内容
  updateSetting() // 刷新配置设置
}

export const createTab = (url: string, active = true) => {
  if (url.length === 0) {
    return
  }
  chrome.tabs.create({ url, active })
}

export const getDomainIcon = (url: string) => {
  if (isNotChrome) {
    return `${url}/favicon.ico`
  }
  return `chrome://favicon/size/16@2x/${url}`
}

export const getDefaultBookmarkName = (url: string) => {
  if (!url) {
    return ''
  }
  const padUrl = url.includes('//') ? url : `https://${url}`
  const domain = padUrl.split('/')[2]
  if (!domain) {
    return ''
  }
  let name = ''
  if (domain.includes(':')) {
    // 端口地址
    name = `:${domain.split(':')[1]}`
  } else {
    const tempSplitList = domain.split('.')
    name = tempSplitList.includes('www') ? tempSplitList[1] : tempSplitList[0] // 设置默认name
  }
  return name
}

export const getIsComponentRender = (componentName: Components) => computed(() => localState.setting[componentName].enabled || moveState.dragTempEnabledMap[componentName])

export const getLayoutStyle = (name: string) => {
  return computed(() => {
    let style = `${localState.style[name].layout.xOffsetKey}:${localState.style[name].layout.xOffsetValue}vw;`
    style += `${localState.style[name].layout.yOffsetKey}:${localState.style[name].layout.yOffsetValue}vh;`
    style += `transform:translate(${localState.style[name].layout.xTranslateValue}%, ${localState.style[name].layout.yTranslateValue}%);`
    return style
  })
}

export const getStyleConst = (field: string) => {
  return computed(() => {
    return styleConst.value[field][localState.common.currAppearanceCode] || styleConst.value[field][0]
  })
}

/**
 * e.g. getStyleField('date', 'unit.fontSize', 'px', 1.2)
 */
export const getStyleField = (component: 'general' | Components, field: string, unit?: string, ratio?: number) => {
  return computed(() => {
    let style = field.split('.').reduce((r: any, c: string) => r[c], localState.style[component])
    if (style instanceof Array) {
      return style[localState.common.currAppearanceCode]
    }
    if (ratio) {
      style = style * ratio
    }
    if (unit) {
      style = `${style}${unit}`
    }
    return style
  })
}

watch(() => localState.setting.general.pageTitle, () => {
  document.title = localState.setting.general.pageTitle
}, { immediate: true })

watch([
  () => localState.style.general.backgroundColor,
  () => localState.style.general.fontColor,
  () => localState.common.currAppearanceCode,
], () => {
  document.body.style.setProperty('--bg-main', getStyleField('general', 'backgroundColor').value)
  document.body.style.setProperty('--text-color-main', getStyleField('general', 'fontColor').value)
}, {
  immediate: true,
  deep: true, // color is array
})
