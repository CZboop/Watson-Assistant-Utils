setupFilesAfterEnv : 
        const removeReactInternalInstance = element => {
            const keys = Object.keys(element);
            const reactInternalInstanceKey = keys.find(key => /^__reactInternalInstance/.test(key));
            if (reactInternalInstanceKey != null) delete element[reactInternalInstanceKey];
          };
          const { expect } = window;
          window.expect = (actual, ...rest) => {
            if (typeof actual === 'object' && actual !== null) {
              if (Array.isArray(actual)) {
                actual.forEach(removeReactInternalInstance);
              } else {
                removeReactInternalInstance(actual);
              }
            }
            return expect(actual, ...rest);
          };
          Object.entries(expect).forEach(([key, value]) => window.expect[key] = value);