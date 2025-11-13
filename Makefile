# Copyright The ORAS Authors.
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

.PHONY: build
build: install
	npm run build

.PHONY: install
install:
	npm install

.PHONY: serve
serve: build
	npm run serve

.PHONY: server
server:
	npm run serve

.PHONY: clean
clean:
	npm run clear

.PHONY: vale
vale:
	vale --config .vale.ini versioned_docs community

.PHONY: vale-accept
vale-accept:
	@echo "Extracting misspellings from Vale output..."
	@vale --config .vale.ini versioned_docs community 2>&1 | \
		grep "Did you really mean" | \
		sed "s/.*'\(.*\)'.*/\1/" | \
		sort -u > /tmp/vale-words.txt
	@if [ -s /tmp/vale-words.txt ]; then \
		cat /tmp/vale-words.txt >> vale/config/vocabularies/oras/accept.txt; \
		sort -u vale/config/vocabularies/oras/accept.txt -o vale/config/vocabularies/oras/accept.txt; \
		echo "Added the following words to accept.txt:"; \
		cat /tmp/vale-words.txt; \
		rm /tmp/vale-words.txt; \
	else \
		echo "No spelling errors found to add."; \
		rm -f /tmp/vale-words.txt; \
	fi
