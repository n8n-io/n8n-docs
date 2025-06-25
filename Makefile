PYTHON := $(shell command -v python3 || command -v python)
PYTHON_VERSION_MIN:=$(shell cat runtime.txt)
PYTHON_VERSION=$(shell $(PYTHON) -c 'import sys; print("%d.%d"% sys.version_info[0:2])' )
PYTHON_VERSION_OK=$(shell $(PYTHON) -c 'import sys;\
  print(int(float("%d.%d"% sys.version_info[0:2]) >= $(PYTHON_VERSION_MIN)))' )

ifeq ($(PYTHON_VERSION_OK),0)
  $(error "Need python $(PYTHON_VERSION) >= $(PYTHON_VERSION_MIN)")
endif

VENV = n8ndocs
PIP = $(VENV)/bin/pip

run: $(VENV)/bin/activate
	mkdocs serve

$(VENV)/bin/activate: requirements.txt
	$(PYTHON) -m venv $(VENV)
	$(PIP) install -r requirements.txt
	[ -d "./_submodules" ] && $(PIP) install -r _submodules/insiders/requirements.txt || $(PIP) install mkdocs-material

clean:
	rm -rf $(VENV)
