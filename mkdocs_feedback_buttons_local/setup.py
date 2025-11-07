from setuptools import setup, find_packages

setup(
    name="mkdocs-feedback-buttons",
    version="0.1.0",
    description="A MkDocs plugin that adds feedback buttons to documentation pages",
    author="n8n",
    author_email="info@n8n.io",
    url="https://github.com/n8n-io/n8n-docs",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "mkdocs>=1.0.0",
    ],
    entry_points={
        "mkdocs.plugins": [
            "feedback-buttons = mkdocs_feedback_buttons.plugin:FeedbackButtonsPlugin",
        ]
    },
    python_requires=">=3.7",
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
    ],
) 