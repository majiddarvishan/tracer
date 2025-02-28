import React, { useState } from "react";
import isEqual from 'lodash.isequal';

import "bootstrap/dist/css/bootstrap.min.css";
import ConfigSideBar from "./ConfigSideBar";
import Editor from "./ConfigEditor";

function Config() {
  const [appData, setAppData] = React.useState({
    config: null,
    schema: null,
    config_hash: null,
    modifiable_paths: {
      insertable: [],
      removable: [],
      replaceable: [],
    },
  });

  const [modification, setModification] = React.useState({
    status: "No change",
    op: null,
    path: null,
    value: null,
    index: null,
  });

  const setModificationStatus = (error) => {
    setModification({
      status: error,
      op: null,
      path: null,
      value: null,
      index: null,
    });
  };

  const handleEditorChange = (updated_config) => {
    function diff(a, b, path = "") {
      function is_object(v) {
        return Object.prototype.toString.call(v) === "[object Object]";
      }
      function is_array(v) {
        return Object.prototype.toString.call(v) === "[object Array]";
      }

      if (
        is_object(a) &&
        is_object(b) &&
        isEqual(Object.keys(a), Object.keys(b))
      )
        // if two object have same keys get diffs of their childrens
        return Object.keys(a).flatMap((key) =>
          diff(a[key], b[key], `${path}/${key}`)
        );

      if (is_array(a) && is_array(b)) {
        if (a.length === b.length) {
          // if two array have same length get diffs of their childrens
          return Array.from(Array(a.length).keys()).flatMap((index) =>
            diff(a[index], b[index], `${path}/${index}`)
          );
        } else if (a.length === b.length - 1) {
          // b has one item more
          let inserted_item_index = null;
          for (let i = 0; i < b.length; i++) {
            // if inserted_item_index is found skip one index in a and compare rest of array
            const a_index = inserted_item_index === null ? i : i - 1;

            if (!isEqual(a[a_index], b[i])) {
              if (inserted_item_index !== null) {
                /*
                                    if inserted_item_index is found already it means there are more than one
                                    difference in two arrays and this can not be one insert operation anymore
                                */
                inserted_item_index = null;
                break;
              }
              inserted_item_index = i;
            }
          }
          if (inserted_item_index !== null)
            return [
              {
                op: "insert",
                path,
                value: b[inserted_item_index],
                index: inserted_item_index,
              },
            ];
        } else if (a.length === b.length + 1) {
          // b has one item less
          let removed_item_index = null;
          for (let i = 0; i < a.length; i++) {
            // if removed_item_index is found skip one index in b and compare rest of array
            const b_index = removed_item_index === null ? i : i - 1;

            if (!isEqual(a[i], b[b_index])) {
              if (removed_item_index !== null) {
                /*
                                    if removed_item_index is found already it means there are more than one
                                    difference in two arrays and this can not be one remove operation anymore
                                */
                removed_item_index = null;
                break;
              }
              removed_item_index = i;
            }
          }
          if (removed_item_index !== null)
            return [
              {
                op: "remove",
                path,
                value: a[removed_item_index],
                index: removed_item_index,
              },
            ];
        }
      }

      if (!isEqual(a, b))
        return [{ op: "replace", path, value: b, index: null }];

      return [];
    }

    const diffs = diff(appData.config, updated_config);

    if (diffs.length === 0) {
      setModificationStatus("No change");
      return;
    }

    const modifiable_paths = appData.modifiable_paths;

    // Only if difference is a single operation
    if (diffs.length === 1) {
      const { op, path, value, index } = diffs[0];
      // If difference is `insert` and its path includes in `modifiable_paths.insertable`
      if (op === "insert" && modifiable_paths.insertable.includes(path)) {
        setModification({
          status: `Insert at index ${index}`,
          op,
          path,
          value,
          index,
        });
        return;
      }
      // If difference is `remove` and its path includes in `modifiable_paths.removable`
      if (op === "remove" && modifiable_paths.removable.includes(path)) {
        setModification({
          status: `Remove at index ${index}`,
          op,
          path,
          value,
          index,
        });
        return;
      }
    }

    function commonPrefix(array) {
      let A = array.concat().sort(),
        a1 = A[0],
        a2 = A[A.length - 1],
        L = a1.length,
        i = 0;
      while (i < L && a1.charAt(i) === a2.charAt(i)) i++;
      return a1.substring(0, i);
    }

    function longestMatch(array, path) {
      array.sort((a, b) => {
        return b.length - a.length;
      });
      return array.find((rpath) => {
        return path.startsWith(rpath);
      });
    }

    const modified_paths = diffs.map((i) => {
      return i.path;
    }); // Array of all modified paths
    const common_modified_path = commonPrefix(modified_paths); // Common path that can include all modified paths
    const replaceable_path = longestMatch(
      modifiable_paths.replaceable,
      common_modified_path
    ); // Find suitable path for replacement
    if (replaceable_path !== undefined) {
      // value is the node that is pointed by replaceable_path in the updated_config
      const value = replaceable_path
        .split("/")
        .slice(1)
        .reduce((node, key_or_index) => {
          return node[key_or_index];
        }, updated_config);
      setModification({
        status: "Replace",
        op: "replace",
        path: replaceable_path,
        value,
        index: null,
      });
      return;
    }

    setModificationStatus("Inapplicable");
  };

  const [expandEditor, setExpandEditor] = React.useState(true);

  const hanldeAppDataReceive = (newAppData) => {
    setModificationStatus("No change");
    setAppData(newAppData);
    setExpandEditor(false);
  };

  return (
    <div className="container-fluid p-3">
      <div className="row">
        {/* Left Sidebar (Smaller) */}
        <div className="col-md-3">
          <ConfigSideBar
            onAppDataReceive={hanldeAppDataReceive}
            ConfigHash={appData.config_hash}
            modificationStatus={modification.status}
            modificationPath={modification.path}
            modificationOp={modification.op}
            modificationValue={modification.value}
            modificationIndex={modification.index}
          />
        </div>

        {/* Right Editor (Larger) */}
        <div className="col-md-9">
          <Editor
            schema={appData.schema}
            config={appData.config}
            onEditorChange={handleEditorChange}
            onEditorError={(error) => setModificationStatus(error)}
            replaceablePaths={appData.modifiable_paths.replaceable}
            expandAll={expandEditor}
          />
        </div>
      </div>
    </div>
  );

}

export default Config;
