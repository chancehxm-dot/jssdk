let  adsenseSelector =  ".adsbygoogle";
handleAdsense({
          adElementSelector: mergedOptions.adsenseSelector,
          idPrefix: mergedOptions.idPrefix,
        });

function handleAdsense  (options) {
      const { adElementSelector, idPrefix } = options;
      const adElements = document.querySelectorAll(adElementSelector);
      // console.log('adElements', adElements);
      if (!adElements.length) return;
      window.isLoaded = true;
      adElements.forEach(function (adElement) {
        // console.log("Adsense广告处理中...", adElement, adElementSelector);
        let checkCount = 0;
        if (typeof MutationObserver !== 'undefined') {
          const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
              if (
                mutation.type === "attributes" &&
                mutation.attributeName === "data-ad-status"
              ) {
                const status = adElement.getAttribute("data-ad-status");

                if (status === "filled") {
                  // 广告有填充，赋值特定id
                  const eleid = utils.setElementId(
                    adElement,
                    utils.generateId(idPrefix, CONFIG.adTypes.ADSENSE)
                  );
                  observer.disconnect();
                } else if (status === "unfilled") {
                  // 广告无填充，收缩广告位
                  observer.disconnect();
                }
              }
            });
          });
          // 开始观察
          observer.observe(adElement, { attributes: true });
        } else {
          // 备用方案：定时检查
          const intervalId = setInterval(function () {
            checkCount++;
            const status = adElement.getAttribute("data-ad-status");

            if (status === "filled") {
              utils.setElementId(
                adElement,
                utils.generateId(idPrefix, CONFIG.adTypes.ADSENSE)
              );
              window.isLoaded && AdFillDetector.handleQuery({ isAdFilled: true, eventList: [adElement.id] });
              // utils.handleCollapse(adElement, false);
              clearInterval(intervalId);
            } else if (status === "unfilled" || checkCount >= CONFIG.maxChecks) {
              // utils.handleCollapse(adElement, true);
              clearInterval(intervalId);
            }
          }, CONFIG.checkInterval);
        }
      });
    }