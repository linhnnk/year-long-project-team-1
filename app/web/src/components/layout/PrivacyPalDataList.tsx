/*
 * Copyright [2023] [Privacypal Authors]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  DataList,
  DataListItem,
  DataListItemRow,
  DataListItemCells,
  DataListCell,
  Title,
} from "@patternfly/react-core";

interface PrivacyPalDataListProps<T extends Record<string, any>> {
  data: T[];
  headings: string[];
}

export const PrivacyPalDataList = <T extends Record<string, any>>({
  data,
  headings,
}: PrivacyPalDataListProps<T>) => {
  const headingCells = headings.slice(0, 2).map((heading, index) => {
    return (
      <DataListCell key={heading + index}>
        <Title headingLevel="h4" ouiaId={`heading-for-${heading}`}>
          {heading}
        </Title>
      </DataListCell>
    );
  });

  const dataRows = data.map((row, rowIndex) => {
    const rowData: string[] = [];

    const cells = Object.keys(row)
      .slice(0, 2)
      .map((key, index) => {
        rowData.push(row[key]);
        return (
          <DataListCell key={rowIndex + key + index}>
            {row[key].toString()}
          </DataListCell>
        );
      });

    return (
      <DataListItem key={rowData.join("") + rowIndex}>
        <DataListItemRow>
          <DataListItemCells dataListCells={cells} />
        </DataListItemRow>
      </DataListItem>
    );
  });

  return (
    <DataList aria-label="PrivacyPal data list" isCompact>
      <DataListItem aria-labelledby="data-list-headings">
        <DataListItemRow>
          <DataListItemCells dataListCells={headingCells} />
        </DataListItemRow>
      </DataListItem>
      {dataRows}
    </DataList>
  );
};