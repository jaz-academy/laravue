/**
 * This is an advanced example for creating icon bundles for Iconify SVG Framework.
 */

const fs = require('fs').promises;
const path = require('path');
const faIcons = require('@iconify-json/fa/icons.json');
const tablerIcons = require('@iconify-json/tabler/icons.json');
const { cleanupSVG, importDirectory, isEmptyColor, parseColors, runSVGO } = require('@iconify/tools');
const { getIcons, getIconsCSS, stringToIcon } = require('@iconify/utils');

const sources = {
    svg: [
        {
            dir: 'resources/images/iconify-svg',
            monotone: false,
            prefix: 'custom',
        },
    ],
    icons: [
        // 'mdi:home',
        // 'mdi:account',
    ],
    json: [
        tablerIcons,
        {
            content: faIcons,
            icons: [
                'facebook',
                'google',
                'twitter',
                'circle',
            ],
        },
    ],
};

// File to save bundle to
const target = path.join(__dirname, 'icons.css');

(async function () {
    // Create directory for output if missing
    const dir = path.dirname(target);
    try {
        await fs.mkdir(dir, {
            recursive: true,
        });
    } catch (err) {
        //
    }
    const allIcons = [];
    /**
     * Convert sources.icons to sources.json
     */
    if (sources.icons) {
        const sourcesJSON = sources.json ? sources.json : (sources.json = []);
        // Sort icons by prefix
        const organizedList = organizeIconsList(sources.icons);
        for (const prefix in organizedList) {
            const iconJson = require(`@iconify/json/json/${prefix}.json`);
            sourcesJSON.push({
                content: iconJson,
                icons: organizedList[prefix],
            });
        }
    }
    /**
     * Bundle JSON files and collect icons
     */
    if (sources.json) {
        for (let i = 0; i < sources.json.length; i++) {
            const item = sources.json[i];
            const content = item.content || item;
            // Tabler fix
            if (content.prefix === 'tabler') {
                for (const k in content.icons)
                    content.icons[k].body = content.icons[k].body.replace(/stroke-width="2"/g, 'stroke-width="1.5"');
            }
            // Filter icons
            if (item.icons?.length) {
                const filteredContent = getIcons(content, item.icons);
                if (!filteredContent)
                    throw new Error(`Cannot find required icons in JSON`);
                allIcons.push(filteredContent);
            } else {
                allIcons.push(content);
            }
        }
    }
    /**
     * Bundle custom SVG icons and collect icons
     */
    if (sources.svg) {
        for (let i = 0; i < sources.svg.length; i++) {
            const source = sources.svg[i];
            // Import icons
            const iconSet = await importDirectory(source.dir, {
                prefix: source.prefix,
            });
            // Validate, clean up, fix palette, etc.
            await iconSet.forEach(async (name, type) => {
                if (type !== 'icon')
                    return;
                // Get SVG instance for parsing
                const svg = iconSet.toSVG(name);
                if (!svg) {
                    // Invalid icon
                    iconSet.remove(name);
                    return;
                }
                // Clean up and optimise icons
                try {
                    // Clean up icon code
                    await cleanupSVG(svg);
                    if (source.monotone) {
                        await parseColors(svg, {
                            defaultColor: 'currentColor',
                            callback: (attr, colorStr, color) => {
                                return !color || isEmptyColor(color) ? colorStr : 'currentColor';
                            },
                        });
                    }
                    await runSVGO(svg);
                } catch (err) {
                    console.error(`Error parsing ${name} from ${source.dir}:`, err);
                    iconSet.remove(name);
                    return;
                }
                iconSet.fromSVG(name, svg);
            });
            allIcons.push(iconSet.export());
        }
    }
    // Generate CSS from collected icons
    const cssContent = allIcons
        .map(iconSet => getIconsCSS(iconSet, Object.keys(iconSet.icons), {
            iconSelector: '.{prefix}-{name}',
            mode: 'mask',
        }))
        .join('\n');
    // Save the CSS to a file
    await fs.writeFile(target, cssContent, 'utf8');
    console.log(`Saved CSS to ${target}!`);
})().catch(err => {
    console.error(err);
});

/**
 * Sort icon names by prefix
 */
function organizeIconsList(icons) {
    const sorted = Object.create(null);
    icons.forEach(icon => {
        const item = stringToIcon(icon);
        if (!item)
            return;
        const prefix = item.prefix;
        const prefixList = sorted[prefix] ? sorted[prefix] : (sorted[prefix] = []);
        const name = item.name;
        if (!prefixList.includes(name))
            prefixList.push(name);
    });
    return sorted;
}
