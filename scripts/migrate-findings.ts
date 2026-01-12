/**
 * Migration script: Move findings from per-device storage to shared storage
 * Run with: npx tsx scripts/migrate-findings.ts
 */

import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  collectionGroup,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD6kphOy9VYwGc5uENEKSsWTA-SJ_mhIvY",
  authDomain: "archeotriage.firebaseapp.com",
  projectId: "archeotriage",
  storageBucket: "archeotriage.firebasestorage.app",
  messagingSenderId: "119741082633",
  appId: "1:119741082633:web:92be016bd5ea6385371cd8",
}

async function migrate() {
  console.log('Initializing Firebase...')
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  console.log('Fetching all findings from devices subcollections...')

  // Get all findings from all devices using collection group query
  const findingsGroup = collectionGroup(db, 'findings')
  const snapshot = await getDocs(findingsGroup)

  console.log(`Found ${snapshot.docs.length} findings to migrate`)

  if (snapshot.docs.length === 0) {
    console.log('No findings to migrate.')
    return
  }

  // Copy each finding to the shared collection
  const sharedCollection = collection(db, 'findings')
  let migrated = 0
  let skipped = 0

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data()
    const id = docSnap.id

    // Check if this is from a device subcollection (has 'devices' in path)
    const path = docSnap.ref.path
    if (!path.includes('devices/')) {
      // Already in shared collection
      skipped++
      continue
    }

    try {
      await setDoc(doc(sharedCollection, id), data)
      console.log(`  Migrated: ${id} - ${data.title || 'Untitled'}`)
      migrated++
    } catch (error) {
      console.error(`  Failed to migrate ${id}:`, error)
    }
  }

  console.log('\nMigration complete!')
  console.log(`  Migrated: ${migrated}`)
  console.log(`  Skipped (already in shared): ${skipped}`)
}

migrate().catch(console.error)
