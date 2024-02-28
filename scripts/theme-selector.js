/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  const storedTheme = localStorage.getItem('theme')
  const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const resolveTheme = (theme) => {
      if (theme === 'auto') {
        return isSystemDark ? 'dark' : 'light';
      } else {
        return theme;
      }
  }

  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme
    }

    return isSystemDark ? 'dark' : 'light'
  }

  const setTheme = function (theme) {
      const resolvedTheme = resolveTheme(theme);
      document.documentElement.setAttribute('data-bs-theme', resolvedTheme);
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = theme => {
    const logo = document.querySelector('#logo');
    const themeDropdownButton = document.querySelector('#themeDropdown');
    const activeThemeIcon = document.querySelector(`[data-theme="${theme}"]`);
    themeDropdownButton.innerHTML = activeThemeIcon.outerHTML;

    const resolvedTheme = resolveTheme(theme);

    logo.src = `/images/svg/stride-logo-${resolvedTheme}.svg`;
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (storedTheme !== 'light' || storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('.dropdown-item-theme')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.id.replace('Theme', '').toLowerCase();
          localStorage.setItem('theme', theme)
          setTheme(theme)
          showActiveTheme(theme)
        })
      })
  })
})()